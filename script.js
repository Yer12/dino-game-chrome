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
    console.log(newPhone)
    // 7774442233
    return `${newPhone}`;
};



function checkUser() {
    if(name.value.length === 0 || phone.value.length === 0) {
        alert("Fill form correctly !")
    }
    else {
        if(phone.value.length === 16 && name.value.length !== 0) {
            localStorage.setItem('lrt_game_phone', formatPhone(phone.value))
            localStorage.setItem('lrt_game_nickname', name.value)
            localStorage.setItem('lrt_game_score', '0')

            let payload =
                {
                    phone: formatPhone(phone.value),
                    lrt_game_nickname: name.value,
                    lrt_game_score: 0
                }

            fetch('https://api.dev.1fit.app/api/lead/lrt_game/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify(payload)
            })
                .then((resp) => {
                })
                .catch((error) => {
                });

            window.location.href="game.html";
        }
        else {
            alert("phone is not correct", phone.value.length)
        }
    }
}
