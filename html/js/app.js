let nextId = products.length + 1;

function renderTable() {
  const tbody = document.getElementById('productTableBody');

  if (products.length === 0) {
    tbody.innerHTML = `<tr class="empty-row"><td colspan="6">Chưa có sản phẩm nào.</td></tr>`;
    return;
  }

  tbody.innerHTML = products.map((p, index) => `
    <tr>
      <td>${index + 1}</td>
      <td class="td-name">${p.name}</td>
      <td>${p.category}</td>
      <td class="td-price">${formatPrice(p.price)}</td>
      <td>
        <span class="badge-status ${p.status === 'Còn hàng' ? 'badge-con' : 'badge-het'}">
          ${p.status}
        </span>
      </td>
      <td>
        <button class="btn-delete" onclick="deleteProduct(${p.id})" title="Xoá">✕</button>
      </td>
    </tr>
  `).join('');
}

function formatPrice(price) {
  return Number(price).toLocaleString('vi-VN') + ' đ';
}

function addProduct() {
  const name     = document.getElementById('inputName').value.trim();
  const category = document.getElementById('inputCategory').value;
  const price    = document.getElementById('inputPrice').value.trim();
  const status   = document.getElementById('inputStatus').value;

  hideAllErrors();

  let hasError = false;

  if (!name || name.length > 100) {
    showError('errName');
    hasError = true;
  }
  if (!category) {
    showError('errCategory');
    hasError = true;
  }
  if (!price || isNaN(price) || Number(price) < 0) {
    showError('errPrice');
    hasError = true;
  }

  if (hasError) return;

  const newProduct = {
    id:       nextId++,
    name:     name,
    category: category,
    price:    Number(price),
    status:   status
  };

  products.push(newProduct);
  renderTable();             
  resetForm();               
}


function deleteProduct(id) {
  if (!confirm('Xoá sản phẩm này?')) return;
  const idx = products.findIndex(p => p.id === id);
  if (idx !== -1) products.splice(idx, 1);
  renderTable();
}

function resetForm() {
  document.getElementById('inputName').value     = '';
  document.getElementById('inputCategory').value = '';
  document.getElementById('inputPrice').value    = '';
  document.getElementById('inputStatus').value   = 'Còn hàng';
  hideAllErrors();
}

function showError(id)  { document.getElementById(id).style.display = 'block'; }
function hideAllErrors(){ ['errName','errCategory','errPrice'].forEach(id => {
  document.getElementById(id).style.display = 'none';
}); }

renderTable();
