const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			Contacts: [],

			contact: {
				id: "",
				name: "",
				phone: "",
				email: "",
				address: ""
			},
			
			contact2: {
				id: "",
				name: "",
				phone: "", 
				email: "",
				address: ""
			},


		},
		actions: {
			getContacts: async () => {
				try {
					const response = await fetch(
						"https://playground.4geeks.com/contact/agendas/agenda"
					);
					if (!response.ok) {
						throw new Error("no se pueden cargar")
					}
					const data = await response.json();
					setStore({
						Contacts: data.contacts,
					})
				} catch (error) {
					console.log(error);
				}
			},

			postContact: async (inputName, inputPhone, inputEmail, inputAddress) => {
				let actions = getActions();
				const response = await fetch("https://playground.4geeks.com/contact/agendas/agenda/contacts", {
					method: "POST",
					body: JSON.stringify({
						name: inputName,
						phone: inputPhone,
						email: inputEmail,
						address: inputAddress
					}),
					headers: {
						'Content-Type': 'application/json'
					}
				})
				if (response.ok) {
					alert("contacto creado correctamente")
					actions.getContacts();
				}else {
					alert("no se puede crear");
				}

			},

			setIdForUpdate: async (id, name, address, phone, email)=>{
				setStore({
					contact2: {
						id: id,
						name: name,
						phone: phone,
						email: email,
						address: address
					},
				})
			},


			putContact: async (inputName, inputPhone, inputEmail, inputAddress) => {
				let actions = getActions();
				let store = getStore();
				
				const response = await fetch('https://playground.4geeks.com/contact/agendas/agenda/contacts/' + `${store.contact2.id}`, {
					method: "PUT",
					body: JSON.stringify({
						name: inputName,
						phone: inputPhone,
						email: inputEmail,
						address: inputAddress
					}),
					headers: {
						'Content-Type': 'application/json'
					}
				})
				if (response.ok) {
					alert("contacto actualizado correctamente")
					actions.getContacts();
				}else {
					alert("no se puede actualizar");
				}
			},

			deleteContact: async (id) => {
				let actions = getActions();
				const response = await fetch('https://playground.4geeks.com/contact/agendas/agenda/contacts/' + `${id}`, {
					method: "DELETE",
				})
				if (!response.ok) {
					alert("no se puede eliminar");
				}else {
					actions.getContacts();
				}
			},
		}
	};
};

export default getState;