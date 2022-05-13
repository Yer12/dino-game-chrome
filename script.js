const phone = document.getElementById("phone")
const name = document.getElementById("name")

IMask(
    document.getElementById('phone'), {
        mask: '+{7}(000)000-00-00'
    });



function handlePaste(e) {
    let pastedData = e.clipboardData.getData('text');
    console.log((pastedData).slice(-10))
    return pastedData.slice(-10);
}

phone.addEventListener('paste', handlePaste)

const formatPhone = (phone) => {
    const newPhone = phone.replace(/\D/g, '').slice(-10);

    // +77774442233
    return `+7${newPhone}`;
};



function checkUser() {
    if(name.value.length === 0 || phone.value.length === 0) {
        alert("Fill form correctly !")
    }
    else {
        if(phone.value.length === 16) {
            localStorage.setItem('user', JSON.stringify({
                phone: formatPhone(phone.value),
                name: name.value,
                score: 0
            }))
            window.location.href="game.html";
        }
        else {
            alert("phone is not correct", phone.value.length)
        }
    }
}
