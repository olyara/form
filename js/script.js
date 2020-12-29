"use strict";

$(document).ready(function () {

    const profileInfoForm = $("form.form_profile-info"),
        addressInfoForm = $("form.form_address-info");

    const title = $(profileInfoForm).find("select#title").get(0),
        inputsFrom1stForm = $(profileInfoForm).find("input.required"),
        inputsFrom2dForm = $(addressInfoForm).find("input.required"),
        privacy = $(profileInfoForm).find("input#privacy").get(0),
        fname = $("input#fname").get(0),
        lname = $("input#lname").get(0),
        tel = $("input#tel").get(0),
        email = $("input#email").get(0),
        password = $("input#password").get(0),
        street = $("input#street").get(0),
        apt = $("input#apt").get(0),
        city = $("input#city").get(0),
        country = $("input#country").get(0),
        postalCode = $("input#postal_code").get(0);


    const welcomeMessageProfile = $(".welcome_message_profile"),
        welcomeMessageAddress = $(".welcome_message_address");

    const editButtonProfile = $(".edit-button_profile").get(0), addButtonProfile = $(".add-button_profile").get(0), cancelButtonProfile = $(".cancel-button_profile").get(0);
    const editButtonAddress = $(".edit-button_address").get(0), addButtonAddress = $(".add-button_address").get(0), cancelButtonAddress = $(".cancel-button_address").get(0);

    let objProfile = {}, objAddress = {};

    console.log($(title));



    function addErrorMessage(field) {
        $(field).siblings(".error_message").css("visibility", "visible");
        $(field).css("border", "1.5px solid #da3535");
        $(field).css("padding", "3.5px 8.5px");
    }

    function deleteErrorMessage(field) {
        $(field).siblings(".error_message").css("visibility", "hidden");
        $(field).css("border", "none");
        $(field).css("padding", "5px 10px");
    }


    // check if blank before submit
    $(title).on("focusout", function () {
        if ($(this).val() === null) {
            addErrorMessage(title);
        } else {
            deleteErrorMessage(title);
        }
    });


    // inputs
    $(inputsFrom1stForm).on("focusout", function () {
        if (this.value === "") {
            addErrorMessage($(this));
        } else {
            deleteErrorMessage($(this));
        }
    });

    $(privacy).on("focusout", function () {
        if ($(this).prop("checked") === false) {
            addErrorMessage($(this));
        } else {
            deleteErrorMessage($(this));
        }
    });

    // check if unnecessary characters are present in fields
    const alphabeticFields = $(profileInfoForm).find("input.alphabetic");
    $(alphabeticFields).on("change", function (e) {
        let newValue = "";
        for (let i = 0; i < this.value.length; i++) {

            if ($.isNumeric(this.value[i]) === false) {
                newValue += `${this.value[i]}`;
            }
        }
        this.value = newValue;
    });


    $(tel).on("change", function () {
        let newValue = "";
        for (let i = 0; i < tel.value.length; i++) {

            if ($.isNumeric(tel.value[i]) === true) {
                newValue += `${tel.value[i]}`;
            }
        }
        tel.value = newValue;
    });

    $(email).on("focusout", function () {
        if (/^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})$/.test(this.value)) {
            deleteErrorMessage(this);
        } else {
            addErrorMessage(this);
        }

    });
    // / inputs



    $(profileInfoForm).on("submit", function (event) {
        let showWelcomeMessage = true;

        event.preventDefault();
        // blank
        if ($(title).val() === null) {
            addErrorMessage(title);
            showWelcomeMessage = false;
        } else {
            deleteErrorMessage(title);
        }

        $(inputsFrom1stForm).each(function (index, input) {
            if (input.value === "") {
                addErrorMessage($(this));
                showWelcomeMessage = false;
            } else {
                deleteErrorMessage($(this));
            }
        });


        if ($(privacy).prop("checked") === false) {
            addErrorMessage($(privacy));
            showWelcomeMessage = false;
        } else {
            deleteErrorMessage($(privacy));
        }



        if (showWelcomeMessage) {
            $(welcomeMessageProfile).html(`Hello, ${fname.value}! 
                <br> You have successfully registered. 
                <br> Your profile: 
                <br> First name: ${fname.value}.
                <br> Last name: ${lname.value}. 
                <br> Contact phone number: ${tel.value}.
                `);
            $(welcomeMessageProfile).css("display", "block");
            $(editButtonProfile).css("display", "block");
            $(addButtonProfile).css("display", "block");
            $(this).css("display", "none");
            objProfile = {
                title: $(title).val(),
                firstName: fname.value,
                lastName: lname.value,
                telephone: tel.value,
                email: email.value,
                password: password.value,
                privacy: $(privacy).prop("checked"),
            };
            let serialObjProfile = JSON.stringify(objProfile);
            localStorage.setItem("Profile info", serialObjProfile);
        }

    });


    $(inputsFrom2dForm).on("focusout", function () {
        if (this.value === "") {
            addErrorMessage($(this));
        } else {
            deleteErrorMessage($(this));
        }
    });


    $(addressInfoForm).on("submit", function (event) {
        let showWelcomeMessage = true;

        event.preventDefault();
        // blank
        if (street.value === "") {
            addErrorMessage($(street));
            showWelcomeMessage = false;
        } else {
            deleteErrorMessage($(street));
        }

        if (city.value === "") {
            addErrorMessage($(city));
            showWelcomeMessage = false;
        } else {
            deleteErrorMessage($(city));
        }

        if (postalCode.value === "") {
            addErrorMessage($(postalCode));
            showWelcomeMessage = false;
        } else {
            deleteErrorMessage($(postalCode));
        }



        if (showWelcomeMessage) {
            $(welcomeMessageAddress).html(`Your address (${street.value} Street, ${city.value}, ${postalCode.value}) has been added.`);
            $(welcomeMessageAddress).css("display", "block");
            $(editButtonAddress).css("display", "block");
            $(addButtonAddress).css("display", "block");
            $(this).css("display", "none");
            objAddress = {
                street: street.value,
                apartment: apt.value,
                city: city.value,
                country: country.value,
                postalCode: postalCode.value,
            };
            let serialObjAddress = JSON.stringify(objAddress);
            localStorage.setItem("Address info", serialObjAddress);
        }
    });


    $(addButtonProfile).on("click", function () {
        $(profileInfoForm).css("display", "block");
        $(title).find("option:first").prop("selected", true);
        $(inputsFrom1stForm).each(function (index, input) {
            input.value = "";
        });
        $(privacy).prop("checked", false);
    });

    $(editButtonProfile).on("click", function () {
        $(profileInfoForm).css("display", "block");
        $(cancelButtonProfile).css("display", "inline");
    });

    $(cancelButtonProfile).on("click", function () {
        let returnObjProfile = JSON.parse(localStorage.getItem("Profile info"));
        $(title).val(returnObjProfile.title);
        fname.value = returnObjProfile.firstName;
        lname.value = returnObjProfile.lastName;
        tel.value = returnObjProfile.telephone;
        email.value = returnObjProfile.email;
        password.value = returnObjProfile.password;
        $(privacy).prop("checked", returnObjProfile.privacy);
    });



    $(addButtonAddress).on("click", function () {
        $(addressInfoForm).css("display", "block");
        $(inputsFrom2dForm).each(function (index, input) {
            input.value = "";
        });
        showWelcomeMessage = true;
    });

    $(editButtonAddress).on("click", function () {
        $(addressInfoForm).css("display", "block");
        $(cancelButtonAddress).css("display", "inline");
    });

    $(cancelButtonAddress).on("click", function () {
        let returnObjAddress = JSON.parse(localStorage.getItem("Address info"));
        street.value = returnObjAddress.street;
        apt.value = returnObjAddress.apartment;
        city.value = returnObjAddress.city;
        country.value = returnObjAddress.country;
        postalCode.value = returnObjAddress.postalCode;
    });

});

