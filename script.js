// Base de datos inicial (Plataforma, Cantidad, Precio Base)
const baseData = [
    { red: 'Instagram', item: '1000 Seguidores', precio: 5.00, icon: 'fa-instagram' },
    { red: 'TikTok', item: '1000 Likes', precio: 3.50, icon: 'fa-tiktok' },
    { red: 'YouTube', item: '1000 Vistas', precio: 8.00, icon: 'fa-youtube' },
    { red: 'Facebook', item: '500 Likes Página', precio: 6.00, icon: 'fa-facebook' },
    { red: 'WhatsApp', item: '500 Miembros Canal', precio: 10.00, icon: 'fa-whatsapp' }
];

// Cargar desde Admin o usar Base
let misServicios = JSON.parse(localStorage.getItem('maikol_pro_db')) || baseData;

// Lógica de Afiliados
const params = new URLSearchParams(window.location.search);
const ref = params.get('ref') || "Directo";
const markup = ref !== "Directo" ? 1.05 : 1.00; // Incremento del 5%

if(ref !== "Directo") document.getElementById('aff-alert').style.display = 'inline-block';

function cargarWeb() {
    const grid = document.getElementById('grid-servicios');
    if(!grid) return;
    grid.innerHTML = "";

    misServicios.forEach(s => {
        const precioFinal = (s.precio * markup).toFixed(2);
        grid.innerHTML += `
            <div class="card">
                <i class="fab ${s.icon || 'fa-star'}"></i>
                <h3>${s.red}</h3>
                <p>${s.item}</p>
                <div class="price">$${precioFinal}</div>
                <button onclick="pedido('${s.red}', '${s.item}', '${precioFinal}')">
                    <i class="fab fa-whatsapp"></i> Comprar Ahora
                </button>
            </div>
        `;
    });
}

function pedido(red, item, precio) {
    const miNum = "5353215857";
    const texto = `*MAIKOLFOLLOWERS-PRO: NUEVO PEDIDO*%0A` +
                  `----------------------------%0A` +
                  `• *Plataforma:* ${red}%0A` +
                  `• *Servicio:* ${item}%0A` +
                  `• *Precio:* $${precio}%0A` +
                  `• *Referido:* ${ref}%0A` +
                  `----------------------------%0A` +
                  `Hola Maikol, deseo adquirir este servicio ahora.`;
    
    window.open(`https://wa.me/${miNum}?text=${texto}`);
}

cargarWeb();

