/*
Bug Belum diperbaiki
1. Fix fitur message
*/

// Clear search input
const searchInput = document.getElementById("searchInput")
const clearIcon = document.getElementById("clearValue")


searchInput.addEventListener("input", function () {
  const keyword = (this.value || "").toLowerCase().trim();
  const rows = document.querySelectorAll("#listCL tr");

  clearIcon.classList.remove("hidden");


  rows.forEach((row) => {
    const text = (row.innerText || "").toLowerCase();
    const cocok = text.includes(keyword);

    row.classList.toggle("hidden", !cocok);
  });
});


clearIcon.addEventListener("click", () => {
  searchInput.value = "";
  clearIcon.classList.add("hidden");
  searchInput.focus();

  // Tampilkan semua baris kembali
  const rows = document.querySelectorAll("#listCL tr");
  rows.forEach((row) => row.classList.remove("hidden"));
});



// Nav bar
const navLinks = document.querySelector(".nav-links")
function onToggleMenu(e) {
  e.name = e.name === "menu" ? "close" : "menu"
  navLinks.classList.toggle("top-[7.5%]");
}


// Option change handler
const optionSelect = document.getElementById("sortOption")
optionSelect.addEventListener("change", fetchData)

// Fetch Data from backend
async function fetchData() {
  try {
    const [responseAZ, responseZA, responseBg, responseWt] = await Promise.all([
      fetch("https://absensimpel-production.up.railway.app/api/listcl-az"),
      fetch("https://absensimpel-production.up.railway.app/api/listcl-za"),
      fetch("https://absensimpel-production.up.railway.app/api/listcl-bg"),
      fetch("https://absensimpel-production.up.railway.app/api/listcl-Wt"),
    ])

    const dataAZ = await responseAZ.json()
    const dataZA = await responseZA.json()
    const bagian = await responseBg.json()
    const waktu = await responseWt.json()

    if (dataAZ.dataCL.length>0 && dataZA.dataCL.length>0 && bagian.dataCL.length>0 && waktu.dataCL.length>0) {
      const option = document.getElementById("sortOption")

      if (option.value == "az") {
        tampilkanDataAZ(dataAZ.dataCL)
      } else if (option.value == "za") {
        console.log("za")
        tampilkanDataZA(dataZA.dataCL)
      } else if (option.value == "bagian") {
        tampilkanDataBg(bagian.dataCL)
      } else if (option.value == "waktu") {
        tampilkanDataWt(waktu.dataCL)
      }
    } else {
      const message = document.getElementById("message")
      message.classList.remove("hidden")
      console.error("Error: Data format is incorrect")
    }
  } catch (error) {
    console.error("Terjadi kesalahan Fetch : ", error)
  }
}

// 1. Display data sorted A-Z
async function tampilkanDataAZ(dataAZ) {
  const listCL = document.getElementById("listCL")
  listCL.innerHTML = ""

  dataAZ.forEach((AZCL) => {
    const waktuFormatted = moment(AZCL.tgl).calendar(); 
    const tr = document.createElement("tr")
    tr.className = "hover:bg-gray-50"
    tr.innerHTML = `
        <td class="px-6 py-4">${AZCL.nama}</td>
        <td class="px-6 py-4">${AZCL.bagian}</td>
        <td class="px-6 py-4">
          <select name="statusValue" class="cursor-pointer status-select">
              <option value="absen" ${AZCL.status === 'absen' ? 'selected' : ''}>Absen</option>
              <option value="in" ${AZCL.status === 'in' ? 'selected' : ''}>In</option>
              <option value="out" ${AZCL.status === 'out' ? 'selected' : ''}>Out</option>
          </select>
        </td>
        <td class="px-6 py-4">${waktuFormatted}</td>
    `

    listCL.appendChild(tr)

    // Change Status
    const select = tr.querySelector(".status-select")
    select.addEventListener("change", (e) => {
      const statusBaru = e.target.value
      statusV(AZCL.id, AZCL.nama, AZCL.bagian, statusBaru)
    })
  })
}

// 2. Display data sorted Z-A
async function tampilkanDataZA(dataZA) {
  const listCL = document.getElementById("listCL")
  listCL.innerHTML = ""

  dataZA.forEach((ZACL) => {
    const waktuFormatted = moment(ZACL.tgl).calendar(); 
    const tr = document.createElement("tr")
    tr.className = "hover:bg-gray-50"
    tr.innerHTML = `
            <td class="px-6 py-4">${ZACL.nama}</td>
            <td class="px-6 py-4">${ZACL.bagian}</td>
            <td class="px-6 py-4">
                <select name="statusValue" class="cursor-pointer status-select">
                    <option value="absen" ${ZACL.status === 'absen' ? 'selected' : ''}>Absen</option>
                    <option value="in" ${ZACL.status === 'in' ? 'selected' : ''}>In</option>
                    <option value="out" ${ZACL.status === 'out' ? 'selected' : ''}>Out</option>
                </select>
            </td>
            <td class="px-6 py-4">${waktuFormatted}</td>
        `
    listCL.appendChild(tr)

    // Change Status - Fixed: Use ZACL instead of AZCL
    const select = tr.querySelector(".status-select")
    select.addEventListener("change", (e) => {
      const statusBaru = e.target.value
      statusV(ZACL.id, ZACL.nama, ZACL.bagian, statusBaru)
    })
  })
}

// 3. Display data sorted by department
async function tampilkanDataBg(dataBg) {
  const listCL = document.getElementById("listCL")
  listCL.innerHTML = ""

  dataBg.forEach((SBG) => {
    const waktuFormatted = moment(SBG.tgl).calendar(); 
    const tr = document.createElement("tr")
    tr.className = "hover:bg-gray-50"
    tr.innerHTML = `
            <td class="px-6 py-4">${SBG.nama}</td>
            <td class="px-6 py-4">${SBG.bagian}</td>
            <td class="px-6 py-4">
                <select name="statusValue" class="cursor-pointer status-select">
                    <option value="absen" ${SBG.status === 'absen' ? 'selected' : ''}>Absen</option>
                    <option value="in" ${SBG.status === 'in' ? 'selected' : ''}>In</option>
                    <option value="out" ${SBG.status === 'out' ? 'selected' : ''}>Out</option>
                </select>
            </td>
            <td class="px-6 py-4">${waktuFormatted}</td>
        `
    listCL.appendChild(tr)

    // Change Status - Fixed: Use SBG instead of AZCL
    const select = tr.querySelector(".status-select")
    select.addEventListener("change", (e) => {
      const statusBaru = e.target.value
      statusV(SBG.id, SBG.nama, SBG.bagian, statusBaru)
    })
  })
}

// 4. Display data sorted by time
async function tampilkanDataWt(dataWt) {
  const listCL = document.getElementById("listCL")
  listCL.innerHTML = ""

  dataWt.forEach((SWT) => {
    const waktuFormatted = moment(SWT.tgl).calendar(); 
    const tr = document.createElement("tr")
    tr.className = "hover:bg-gray-50"
    tr.innerHTML = `
            <td class="px-6 py-4">${SWT.nama}</td>
            <td class="px-6 py-4">${SWT.bagian}</td>
            <td class="px-6 py-4">
                <select name="statusValue" class="cursor-pointer status-select">
                    <option value="absen" ${SWT.status === 'absen' ? 'selected' : ''}>Absen</option>
                    <option value="in" ${SWT.status === 'in' ? 'selected' : ''}>In</option>
                    <option value="out" ${SWT.status === 'out' ? 'selected' : ''}>Out</option>
                </select>
            </td>
            <td class="px-6 py-4">${waktuFormatted}</td>
        `
    listCL.appendChild(tr)

    const select = tr.querySelector(".status-select")
    select.addEventListener("change", (e) => {
      const statusBaru = e.target.value
      statusV(SWT.id, SWT.nama, SWT.bagian, statusBaru)
    })
  })
}

// Change status function
async function statusV(id, name, bagian, status) {
  try {
    const responseSV = await fetch(`/api/editcl/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nama: name, bagian: bagian, status: status }),
    })

    const result = await responseSV.json()
    if(result){
      fetchData()
    }
  } catch (error) {
    console.error("Error ubah status : ", error)
  }
}

// Initialize data fetch
fetchData()
