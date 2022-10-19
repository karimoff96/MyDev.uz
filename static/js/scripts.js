/*!
* Start Bootstrap - Clean Blog v6.0.8 (https://startbootstrap.com/theme/clean-blog)
* Copyright 2013-2022 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-clean-blog/blob/master/LICENSE)
*/
window.addEventListener('DOMContentLoaded', () => {
    let scrollPos = 0;
    const mainNav = document.getElementById('mainNav');
    const headerHeight = mainNav.clientHeight;
    window.addEventListener('scroll', function () {
        const currentTop = document.body.getBoundingClientRect().top * -1;
        if (currentTop < scrollPos) {
            // Scrolling Up
            if (currentTop > 0 && mainNav.classList.contains('is-fixed')) {
                mainNav.classList.add('is-visible');
            } else {
                console.log(123);
                mainNav.classList.remove('is-visible', 'is-fixed');
            }
        } else {
            // Scrolling Down
            mainNav.classList.remove(['is-visible']);
            if (currentTop > headerHeight && !mainNav.classList.contains('is-fixed')) {
                mainNav.classList.add('is-fixed');
            }
        }
        scrollPos = currentTop;
    });
})

const sendBtn = document.getElementById('submitButton')

sendBtn.addEventListener("click", sendMessage)

function sendMessage(event) {
    console.log("derere")
    event.preventDefault()
    const phone = document.getElementById("phone");
    const name = document.getElementById("name");
    const body = document.getElementById("message");
    const subject = `From ${name.value}`;

    const message =
        `Phone: ${phone.value} \n
         Message: ${body.value}`;

    const uri = `https://mail.google.com/mail/?view=cm&fs=1&to=doniyorkarimoff96@gmail.com&su=${subject}&body=${body.value}`

    // check messages
    if (name.value === "" || body.value === "") {
        alert("Fill all fields")
        return
    }
    const api = new XMLHttpRequest()
    window.open(uri, "_blank")

    phone.value = ""
    name.value = ""
    body.value = ""

}




