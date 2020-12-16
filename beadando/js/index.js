
var manufacturers = [];
var manufacturerNames = [];
var cars = [];
var checkedBoxes = [];
jQuery(function ($) {
    $(window).on('load', function () {

    });
    //default
    DrawCheckBoxes();
    setTimeout(DrawCarTable, 600)
});

function DrawCheckBoxes() {
    $(".wrapper").show();
    let checkboxes = $(".checkboxes");
    checkboxes.show();
    checkboxes.empty();
    $(".content").show();
    $(".cards").hide();
    getManufacturerNames().done(() => {
        manufacturerNames.forEach((value, index) => {
            checkboxes.append(`
                <label for="m${index}" class="">
                    <input type="checkbox"  value="${value}"  checked onchange="DrawCarTable()" id="m${index}">${value}
                </label>
            `);
        });
    });
}

function DrawCarTable() {
    checkedBoxes = getCheckedBoxes();
    $(".wrapper").show();
    $(".checkboxes").show();
    let content = $(".content");
    content.show();
    $(".cards").hide();
    content.empty();
    content.append(`
            <table id="carTable">
                <tr>
                    <th>Name</th>
                    <th>Consumption</th>
                    <th>Color</th>
                    <th>Manufacturer</th>
                    <th>Available</th>
                    <th>Year</th>
                    <th>Horsepower</th>
                    <th></th>
                </tr>
            </table>
        `);
    getCars().done(() => {
        cars.forEach(((value) => {
            if (checkedBoxes.includes(value.manufacturer)) {
                $("#carTable").append(`
                    <tr>
                        <td>${value.name}</td>
                        <td>${value.consumption}</td>
                        <td>${value.color}</td>
                        <td>${value.manufacturer}
                        <td>${value.avaiable}</td>
                        <td>${value.year}</td>
                        <td>${value.horsepower}</td>
                        <td>
                            <button onclick="updateCar('${value._id}',
                                            { name: '${value.name}', 
                                            manufacturer: '${value.manufacturer}',
                                            consumption:'${value.consumption}',
                                            color:'${value.color}',
                                            year:'${value.year}', 
                                            avaiable:'${value.avaiable}',
                                            horsepower:'${value.horsepower}'} )">
                                Update
                            </button>
                        </td>
                    </tr>`);
            }
        }))
    });

}
function DrawAllCarTable() {
    $(".wrapper").show();
    let content = $(".content");
    content.show();
    $(".cards").hide();
    $(".checkboxes").hide();
    content.empty();
    content.append(`
            <table id="carTable">
                <tr>
                    <th>Name</th>
                    <th>Consumption</th>
                    <th>Color</th>
                    <th>Manufacturer</th>
                    <th>Available</th>
                    <th>Year</th>
                    <th>Horsepower</th>
                    <th></th>  
                </tr>
            </table>
        `);
    getCars().done(() => {
        cars.forEach(((value) => {
            $("#carTable").append(`
                    <tr>
                        <td>${value.name}</td>
                        <td>${value.consumption}</td>
                        <td>${value.color}</td>
                        <td>${value.manufacturer}</td>
                        <td>${value.avaiable}</td>
                        <td>${value.year}</td>
                        <td>${value.horsepower}</td>
                        <td>
                            <button onclick="updateCar('${value._id}',
                                                {name: '${value.name}', 
                                                manufacturer: '${value.manufacturer}',
                                                consumption:'${value.consumption}',
                                                color:'${value.color}',
                                                year:'${value.year}', 
                                                avaiable:'${value.avaiable}',
                                                horsepower:'${value.horsepower}'} )">
                                Update
                            </button>
                        </td>
                    </tr>`);
        }))
    });
}

function DrawManufacturers() {
    $(".checkboxes").hide();
    $(".content").hide();
    $(".wrapper").hide();
    let cards = $(".cards");
    cards.empty();
    cards.show();
    getManufacturers().done(() => {
        manufacturers.forEach((value) => {
            cards.append(`
                <div class="card">
                <h3>${value.name}</h3>
                <p>${value.country}</p>
                <p>${value.founded}</p>
                </div>`);
        })
    })
}

function getCheckedBoxes() {
    let cb = $("input[type=checkbox]").filter((i, e) => {
        return e.checked === true;
    }).map((i, e) => {
        return e.value;
    });
    return cb.get();
}
function removeCheckedBoxes(manufacturer) {
    $("input[type=checkbox]").prop('checked', false);
    let toCheck = $("input[type=checkbox]").filter((i, e) => {
        return e.value === manufacturer;
    });
    toCheck.prop('checked', true);
    DrawCarTable();
}

//get all cars from api
function getCars() {
    return $.get("https://webtechcars.herokuapp.com/api/cars", function (data) {
        cars = data;
    });
}
//get all manufacturers
function getManufacturers() {
    return $.get("https://webtechcars.herokuapp.com/api/manufacturers", function (data) {
        manufacturers = data;
    });

}
//get the names of manufacturers
function getManufacturerNames() {
    return $.get("https://webtechcars.herokuapp.com/api/manufacturers", function (data) {
        manufacturerNames = data.map(d => {
            return d.name;
        });
    });
}

function openForm() {
    document.getElementById("popupForm").style.display = "block";
}
function closeForm() {
    document.getElementById("popupForm").style.display = "none";
}
function openCarForm(car = { name: "", manufacturer: "", consumption: "", color: "", year: "", avaiable: "", horsepower: "" }) {
    $(".form-container").html(`
        <h2>Add new Car</h2>
        <label for="name">
            <strong>name</strong>
        </label>
        <input type="text" placeholder="Astra" name="name" required value="${car.name}">
        <label for="manufacturer">
            <strong>manufacturer</strong>
        </label>
        <input type="text" placeholder="ford" name="manufacturer" required value="${car.manufacturer}">
        <label for="consumption">
            <strong>consumption</strong>
        </label>
        <input type="text" placeholder="6.5 l" name="consumption" required value="${car.consumption}">
        <label for="color">
            <strong>color</strong>
        </label>
        <input type="text" placeholder="red" name="color" required value="${car.color}">
        <label for="year">
            <strong>year</strong>
        </label>
        <input type="text" placeholder="1999" name="year" required value="${car.year}">
        <label for="avaiable">
            <strong>available</strong>
        </label>
        <input type="number" placeholder="2" name="avaiable" required value="${car.avaiable}">
        <label for="horsepower">
            <strong>horsepower</strong>
        </label>
        <input type="number" placeholder="50" name="horsepower" required>
        <button type="submit" class="btn" onclick="submitCarForm()">Submit</button>
        <button type="submit" class="btn cancel" onclick="closeForm()">Cancel</button>
        `);
    openForm();
}

function submitCarForm() {
    var sent = false;
    getManufacturerNames().done(() => {
        manufacturerNames.map(n => {
            if ($("input[name='manufacturer']").val() === n) {
                sent = true;
                $.ajax("https://webtechcars.herokuapp.com/api/cars", {
                    data: JSON.stringify({
                        name: $("input[name='name']").val(),
                        consumption: $("input[name='consumption']").val(),
                        color: $("input[name='color']").val(),
                        manufacturer: $("input[name='manufacturer']").val(),
                        avaiable: $("input[name='avaiable']").val(),
                        year: $("input[name='year']").val(),
                        horsepower: $("input[name='horsepower']").val()
                    }),
                    contentType: 'application/json',
                    type: 'POST',
                    success: function(){
                        setTimeout(DrawAllCarTable(), 1000);
                        closeForm();
                    },
                })
            }
        })
        if (!sent) {
            alert("The manufacturer is not exist!")
        }
    });
}

function deleteCar(id) {
    $.ajax(`https://webtechcars.herokuapp.com/api/cars/${id}`,
        {
            type: 'DELETE',
        });
}

function updateCar(id, car = { name: "", manufacturer: "", consumption: "", color: "", year: "", avaiable: "", horsepower: "" }) {
    deleteCar(id);
    openCarForm(car);
}

function openManufacturerForm() {
    $(".form-container").html(`
        <h2>Add new Manufacturer</h2>
        <label for="name">
            <strong>name</strong>
        </label>
        <input type="text" placeholder="Mclaren" name="name" required>
        <label for="country">
            <strong>country</strong>
        </label>
        <input type="text" placeholder="UK" name="country" required>
        <label for="founded">
            <strong>founded</strong>
        </label>
        <input type="text" placeholder="1999" name="founded" required>

        <button type="submit" class="btn" onclick="submitManufacturerForm()">Submit</button>
        <button type="submit" class="btn cancel" onclick="closeForm()">Cancel</button>
        `);
    openForm();
}
function submitManufacturerForm() {
    $.ajax("https://webtechcars.herokuapp.com/api/manufacturers", {
                    data: JSON.stringify({
                        name: $("input[name='name']").val(),
                        country: $("input[name='country']").val(),
                        founded: $("input[name='founded']").val(),
                    }),
                    contentType: 'application/json',
                    type: 'POST',
                    success: function(){
                        setTimeout(DrawManufacturers(), 1000);
                        closeForm();
                    },
                })
}
