
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


// Tampilin data
async function fetchData() {
  try {
    const responseD = await fetch(`https://absensimpel-production.up.railway.app/api/listcl-Wt`)
    const data = await responseD.json()
    const message = document.getElementById('message');
    console.log(data.dataCL)

    if(data.dataCL.length>0){
        message.classList.add('hidden')
        TampilkanData(data.dataCL)

    }else{
        TampilkanData(data.dataCL)
        message.classList.remove('hidden')
    }

  } catch (error) {
    console.error("Error ubah status : ", error)
  }
}

async function TampilkanData(data) {
    const listCL = document.getElementById("listCL")
    listCL.innerHTML = ""

    data.forEach((dataCL) => {
        const waktuFormatted = moment(dataCL.tgl).calendar(); 
        const tr = document.createElement("tr")
        tr.className = "hover:bg-gray-50"
        tr.innerHTML = `
            <td class="px-6 py-4">${dataCL.nama}</td>
            <td class="px-6 py-4">${dataCL.bagian}</td>
            <td class="px-6 py-4">${dataCL.status}</td>
            <td class="px-6 py-4">${waktuFormatted}</td>
            <td class="px-6 py-4 flex gap-2">
                <button class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1 rounded-md editBtn">
                    Edit
                </button>
                <button class="deleteCL bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded-md">
                    <ion-icon name="trash-outline"></ion-icon>
                </button>
            </td>
        `

        listCL.appendChild(tr)

        // delete
        const deleteBtn = tr.querySelector('.deleteCL');
        deleteBtn.addEventListener('click', () => {
            deletedCL(dataCL.id);
        });

        // Edit
        const editbutton = tr.querySelector('.editBtn')
        editbutton.addEventListener('click',()=>{
            const editMessage = document.getElementById("editMessage")
            editMessage.classList.remove('hidden')
            editMessage.innerHTML = ""

            const status = dataCL.status.toLowerCase();
            const div = document.createElement("div")
            div.className = "bg-white border shadow rounded-md px-3 py-2 flex flex-col gap-4 pb-4"
            div.innerHTML = `
                <div class="flex justify-between">
                    <p class="font-semibold">Edit Anggota CL</p>
                    <ion-icon name="close-outline" class="cursor-pointer rounded-full hover:bg-gray-200" id="closeEdit"></ion-icon>
                </div>

                <div class="flex flex-col gap-4 justify-between">
                    <div class="flex gap-8 justify-between">
                        <label for="nama" class="cursor-pointer">Nama : </label>
                        <input type="text" class="rounded-md w-60 border-2 shadow hover:border-gray-400 px-1" id="edit-nama" value="${dataCL.nama}">
                    </div>
                    
                    <div class="flex gap-8 justify-between items-center">
                        <label for="bagian" class="cursor-pointer">Bagian : </label>
                        <input type="text" class="rounded-md w-60 border-2 shadow hover:border-gray-400 px-1" id="edit-bagian" value="${dataCL.bagian}">
                    </div>

                    <div class="flex flex-col">
                        <p> Status :</p>
                        <select name="statusValue" id="edit-status" class="cursor-pointer w-28 h-9 shadow border-2 hover:border-gray-400 ml-4">
                            <option value="absen" ${status === 'absen' ? 'selected' : ''}>Absen</option>
                            <option value="in" ${status === 'in' ? 'selected' : ''}>In</option>
                            <option value="out" ${status === 'out' ? 'selected' : ''}>Out</option>
                        </select>

                    </div>
                </div>

                <div class="flex ml-[78%]">
                    <button class=" rounded-md bg-blue-400 w-16 hover:bg-blue-300 py-1 items-center" id="simpanEditCL">Simpan</button>
                </div>
            `
            editMessage.appendChild(div);

            const simpanEdit = document.getElementById('simpanEditCL')
            simpanEdit.addEventListener("click", () => {
                const namaBaru = document.querySelector('#edit-nama').value;
                const bagianBaru = document.querySelector('#edit-bagian').value;
                const statusBaru = document.querySelector('#edit-status').value;
                editMessage.classList.add('hidden')
                editStatus(dataCL.id, namaBaru, bagianBaru, statusBaru);

                editMessage.innerHTML = "";

            });

            const closeEdit = document.getElementById("closeEdit");
            closeEdit.addEventListener("click", () => {
                editMessage.classList.add('hidden')
                editMessage.innerHTML = "";

            });
        })
    })
} 



// Nav bar
const navLinks = document.querySelector(".nav-links")
function onToggleMenu(e) {
  e.name = e.name === "menu" ? "close" : "menu"
  navLinks.classList.toggle("top-[7.5%]");
}




// create message
const createCL = document.getElementById('createCL')
const createMessage = document.getElementById('createMessage');
const message = document.getElementById('message')
createCL.addEventListener('click',()=>{
    createMessage.classList.remove('hidden')
})

const closeCreate = document.getElementById('closeCreate');
closeCreate.addEventListener('click',()=>{
    createMessage.classList.add('hidden')
})

// Create 
const simpanCL = document.getElementById('simpanCL');
simpanCL.addEventListener('click',()=>{
    const nama = document.getElementById('nama');
    const bagian = document.getElementById('bagian');
    const select = document.getElementById('status-select');
    const status = select.options[select.selectedIndex].text.toLowerCase();
    saveCL(nama.value,bagian.value,status)
    createMessage.classList.add('hidden')
    nama.value= ""
    bagian.value= ""
})

async function saveCL(nama,bagian,status) {
    try{
        const responseS = await fetch(`/api/addcl`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ nama: nama, bagian: bagian, status: status }),
        })
        if(responseS){
            fetchData()
        }

    }catch(error){
        console.error("Error simpan data : ", error)
    }
}


// delete
async function deletedCL(id) {
    try{
        const responseD = await fetch(`/api/deletecl/${id}`,{
            method:'DELETE',
            headers: { "Content-Type": "application/json" }
        })
        if (responseD){
            fetchData();
        }
    }catch(error){
        console.error("Error simpan data : ", error)
    }
}

// Edit
async function editStatus(id,nama,bagian,status) {
    try{
        const responseE = await fetch(`/api/editcl/${id}`,{
            method:'PUT',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ nama: nama, bagian: bagian, status: status }),
        })
        if (responseE){
            fetchData()
        }else{
            console.log(error)
        }
    }catch(error){
        console.error("Error ubah data : ", error)
    }
}





fetchData()