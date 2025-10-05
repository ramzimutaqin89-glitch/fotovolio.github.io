document.getElementById("bnt").addEventListener('click', () =>{
    window.location.href = 'https://www.canva.com/design/DAGxEbZhrHE/rc3I2sEA92iFwPI_nImWbQ/edit';
})

document.getElementById("uy").addEventListener('click', () =>{
    window.location.href = '#comen-contact';
})



// --- Fungsionalitas Animasi Scroll ---
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            // Jika elemen masuk ke layar, tambahkan class 'show'
            entry.target.classList.add('show');
        } else {
            // Jika elemen keluar dari layar, hapus class 'show'
            // Ini akan membuat animasi terulang saat elemen masuk lagi
            entry.target.classList.remove('show');
        }
    });
}, {
    // Threshold 0.1 berarti callback akan dipicu saat 10% elemen terlihat
    threshold: 0.1
});

// Pilih semua elemen yang ingin diberi animasi saat di-scroll
const elementsToAnimate = document.querySelectorAll('.hidden');
elementsToAnimate.forEach((el) => observer.observe(el));


// --- Fungsionalitas Tombol Menu (Tab) ---
function showSection(sectionId) {
    // Sembunyikan semua konten section
    const contentSections = document.querySelectorAll('.content-section');
    contentSections.forEach(section => {
        section.classList.remove('active');
    });

    // Tampilkan section yang dipilih
    const selectedSection = document.getElementById(sectionId);
    if (selectedSection) {
        selectedSection.classList.add('active');
    }

    // Perbarui tampilan tombol yang aktif
    const menuButtons = document.querySelectorAll('.menu button');
    menuButtons.forEach(button => {
        button.classList.remove('active-button');
    });
    event.target.classList.add('active-button');
}

// Inisialisasi: Tampilkan section 'course' saat halaman pertama kali dimuat
document.addEventListener('DOMContentLoaded', () => {
    const courseButton = document.querySelector('.menu button[onclick="showSection(\'course\')"]');
    if (courseButton) {
        courseButton.click();
    }
});


// input


 
        // Variabel global
        var data = [];
        const LOCAL_STORAGE_KEY = 'komentarData';

        // Fungsi untuk menyimpan data ke localStorage
        function simpanKeLocalStorage() {
            localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data));
        }

        // Fungsi untuk memuat data dari localStorage saat halaman dibuka
        function muatDariLocalStorage() {
            const dataTersimpan = localStorage.getItem(LOCAL_STORAGE_KEY);
            if (dataTersimpan) {
                data = JSON.parse(dataTersimpan);
            }
            renderData();
        }

        // Fungsi untuk menampilkan (me-render) seluruh data ke dalam card
        function renderData() {
            var hasilDiv = document.getElementById("hasil");
            hasilDiv.innerHTML = '';

            var container = document.createElement('div');
            container.className = 'komentar-container';

            if (data.length === 0) {
                hasilDiv.innerHTML = '<p style="text-align: center; color: #777;">Belum ada komentar.</p>';
                return;
            }

            for (var i = 0; i < data.length; i++) {
                var card = document.createElement('div');
                card.className = 'komentar-card';

                card.innerHTML = `
                    <h3>${data[i][0]}</h3>
                    <p><strong>Email:</strong> ${data[i][1]}</p>
                    <p><strong>Komentar:</strong> ${data[i][2]}</p>
                    <div class="aksi">
                        <button class="edit" onclick="editData(${i})">Edit</button>
                        <button class="hapus" onclick="hapusData(${i})">Hapus</button>
                    </div>
                `;
                
                container.appendChild(card);
            }
            
            hasilDiv.appendChild(container);
        }

        // Fungsi utama untuk menyimpan data baru atau mengupdate data
        function simpanData() {
            var nama = document.getElementById("nama").value;
            var email = document.getElementById("email").value;
            var comen = document.getElementById("comen").value;
            var editIndex = document.getElementById("editIndex").value;

            // Validasi sederhana: pastikan semua field terisi
            if (nama === "" || email === "" || comen === "") {
                alert("Mohon lengkapi semua data.");
                return;
            }

            if (editIndex !== "") {
                data[editIndex] = [nama, email, comen];
                document.getElementById("editIndex").value = "";
            } else {
                data.push([nama, email, comen]);
            }
            
            document.getElementById("nama").value = "";
            document.getElementById("email").value = "";
            document.getElementById("comen").value = "";

            renderData();
            simpanKeLocalStorage();
        }

        // Fungsi untuk menghapus data
        function hapusData(index) {
            if (confirm("Apakah Anda yakin ingin menghapus data ini?")) {
                data.splice(index, 1);
                renderData();
                simpanKeLocalStorage();
            }
        }

        // Fungsi untuk mengedit data
        function editData(index) {
            var item = data[index];
            document.getElementById("nama").value = item[0];
            document.getElementById("email").value = item[1];
            document.getElementById("comen").value = item[2];
            document.getElementById("editIndex").value = index;
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }

        // Panggil fungsi ini saat halaman pertama kali dimuat
        muatDariLocalStorage();