const API_URL = "http://localhost:8000/users";

function createRemoveButton(userId) {
    const removeButton = document.createElement("button");
    removeButton.classList.add("remove-button");
    removeButton.setAttribute("data-id", userId);

    const iconSpan = document.createElement("span");
    iconSpan.classList.add("material-icons");
    iconSpan.textContent = "delete_outline";

    removeButton.appendChild(iconSpan);

    removeButton.addEventListener("click", () => {
        if (confirm("Czy na pewno chcesz usunąć tego użytkownika?")) {
            executeDelete(userId, removeButton);
        }
    });

    return removeButton;
}

async function executeDelete(userId, button) {
    try {
        const response = await fetch(`${API_URL}/${userId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id: userId })
        });
        if (response.ok) {
            const userElement = button.closest('.user-wrapper');
            userElement.remove(); 
        } else {
            alert('Nie udało się usunąć użytkownika.');
        }
    } catch (error) {
        console.error('Błąd:', error);
        alert('Wystąpił błąd podczas próby usunięcia użytkownika.');
    }
}

async function getItems() {
    try {
        const response = await axios.get(API_URL);
        console.log(response);

        const users = response.data;
        displayUsers(users);
    } catch (error) {
        console.error("Error fetching users:", error);
    }
}

export function displayUsers(users) {
    const userList = document.querySelector(".users-wrapper");
    userList.innerHTML = "";

    users.forEach(user => {
        const userElement = createUserElement(user);
        userList.appendChild(userElement);
    });
}

function createUserElement(user) {
    const wrapper = document.createElement("div");
    wrapper.classList.add("user-wrapper");

    const userInfo = createUserInfo(user);
    const deleteButton = createRemoveButton(user.id);

    wrapper.appendChild(userInfo);
    wrapper.appendChild(deleteButton);

    return wrapper;
}

function createUserInfo(user) {
    const userInfo = document.createElement("div");
    userInfo.classList.add("user-wrapper-infos");

    const nameDiv = document.createElement("div");
    nameDiv.textContent = `${user.first_name} ${user.last_name}`;
    nameDiv.classList.add("user-wrapper-infos-name");

    const roleDiv = document.createElement("div");
    roleDiv.textContent = user.role;
    roleDiv.classList.add("user-wrapper-infos-role");

    userInfo.appendChild(nameDiv);
    userInfo.appendChild(roleDiv);

    return userInfo;
}

getItems();