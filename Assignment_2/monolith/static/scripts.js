function getNames() {
    fetch('/get_names')
        .then(response => response.json())
        .then(names => {
            let list = document.getElementById('namesList');
            console.log(list);
            list.innerHTML = ''; // Clear existing names
            console.log(names);
            names.forEach(name => {
                let item = document.createElement('li');
                item.textContent = name[1];
                item.dataset.id = name[0];

                let btns = document.createElement('div');
            
                let updateBtn = document.createElement('button');
                updateBtn.textContent = "Update";
                updateBtn.onclick = function() { updateName(name[0]); };
            
                let deleteBtn = document.createElement('button');
                deleteBtn.textContent = "Delete";
                deleteBtn.onclick = function() { deleteName(name[0]); };
                
                item.appendChild(updateBtn);
                item.appendChild(deleteBtn);
                list.appendChild(item);
            });
            
        });
        
}

function updateName(id) {
    let newName = prompt("Enter the new name:");
    if (newName) {
        fetch('/update_name', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id: id, name: newName })
        })
        .then(() => {
            getNames(); // Refresh the list
        });
    }
}

function deleteName(id) {
    fetch('/delete_name', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: id })
    })
    .then(() => {
        getNames(); // Refresh the list
    });
}

function addName() {
    const name = document.getElementById('name').value;
    if (name) {
        fetch('/add_name', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name: name })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                getNames();
            } else {
                alert('Failed to add name.');
            }
        });
    }
}


