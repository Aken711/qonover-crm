import React, {useState} from 'react';
import Select from 'react-select'

const options = [
    {
        "value": "Afghanistan",
        "label": "Afghanistan"
    },
    {
        "value": "Åland Islands",
        "label": "Åland Islands"
    },
    {
        "value": "Albania",
        "label": "Albania"
    },
    {
        "value": "Algeria",
        "label": "Algeria"
    },
    {
        "value": "American Samoa",
        "label": "American Samoa"
    },
    {
        "value": "Andorra",
        "label": "Andorra"
    },
    {
        "value": "Angola",
        "label": "Angola"
    },
    {
        "value": "Anguilla",
        "label": "Anguilla"
    },
    {
        "value": "Antarctica",
        "label": "Antarctica"
    },
    {
        "value": "Antigua and Barbuda",
        "label": "Antigua and Barbuda"
    },
    {
        "value": "Argentina",
        "label": "Argentina"
    },
    {
        "value": "Armenia",
        "label": "Armenia"
    },
    {
        "value": "Aruba",
        "label": "Aruba"
    },
    {
        "value": "Australia",
        "label": "Australia"
    },
    {
        "value": "Austria",
        "label": "Austria"
    },
    {
        "value": "Azerbaijan",
        "label": "Azerbaijan"
    },
    {
        "value": "Bahamas",
        "label": "Bahamas"
    },
    {
        "value": "Bahrain",
        "label": "Bahrain"
    },
    {
        "value": "Bangladesh",
        "label": "Bangladesh"
    },
    {
        "value": "Barbados",
        "label": "Barbados"
    },
    {
        "value": "Belarus",
        "label": "Belarus"
    },
    {
        "value": "Belgium",
        "label": "Belgium"
    },
    {
        "value": "Belize",
        "label": "Belize"
    },
    {
        "value": "Benin",
        "label": "Benin"
    },
    {
        "value": "Bermuda",
        "label": "Bermuda"
    },
    {
        "value": "Bhutan",
        "label": "Bhutan"
    },
    {
        "value": "Bolivia, Plurinational State of",
        "label": "Bolivia, Plurinational State of"
    },
    {
        "value": "Bonaire, Sint Eustatius and Saba",
        "label": "Bonaire, Sint Eustatius and Saba"
    },
    {
        "value": "Bosnia and Herzegovina",
        "label": "Bosnia and Herzegovina"
    },
    {
        "value": "Botswana",
        "label": "Botswana"
    },
    {
        "value": "Bouvet Island",
        "label": "Bouvet Island"
    },
    {
        "value": "Brazil",
        "label": "Brazil"
    },
    {
        "value": "British Indian Ocean Territory",
        "label": "British Indian Ocean Territory"
    },
    {
        "value": "Brunei Darussalam",
        "label": "Brunei Darussalam"
    },
    {
        "value": "Bulgaria",
        "label": "Bulgaria"
    },
    {
        "value": "Burkina Faso",
        "label": "Burkina Faso"
    },
    {
        "value": "Burundi",
        "label": "Burundi"
    },
    {
        "value": "Cabo Verde",
        "label": "Cabo Verde"
    },
    {
        "value": "Cambodia",
        "label": "Cambodia"
    },
    {
        "value": "Cameroon",
        "label": "Cameroon"
    },
    {
        "value": "Canada",
        "label": "Canada"
    },
    {
        "value": "Cayman Islands",
        "label": "Cayman Islands"
    },
    {
        "value": "Central African Republic",
        "label": "Central African Republic"
    },
    {
        "value": "Chad",
        "label": "Chad"
    },
    {
        "value": "Chile",
        "label": "Chile"
    },
    {
        "value": "China",
        "label": "China"
    },
    {
        "value": "Christmas Island",
        "label": "Christmas Island"
    },
    {
        "value": "Cocos (Keeling) Islands",
        "label": "Cocos (Keeling) Islands"
    },
    {
        "value": "Colombia",
        "label": "Colombia"
    },
    {
        "value": "Comoros",
        "label": "Comoros"
    },
    {
        "value": "Congo",
        "label": "Congo"
    },
    {
        "value": "Congo, Democratic Republic of the",
        "label": "Congo, Democratic Republic of the"
    },
    {
        "value": "Cook Islands",
        "label": "Cook Islands"
    },
    {
        "value": "Costa Rica",
        "label": "Costa Rica"
    },
    {
        "value": "Croatia",
        "label": "Croatia"
    },
    {
        "value": "Cuba",
        "label": "Cuba"
    },
    {
        "value": "Curaçao",
        "label": "Curaçao"
    },
    {
        "value": "Cyprus",
        "label": "Cyprus"
    },
    {
        "value": "Czechia",
        "label": "Czechia"
    },
    {
        "value": "Côte d'Ivoire",
        "label": "Côte d'Ivoire"
    },
    {
        "value": "Denmark",
        "label": "Denmark"
    },
    {
        "value": "Djibouti",
        "label": "Djibouti"
    },
    {
        "value": "Dominica",
        "label": "Dominica"
    },
    {
        "value": "Dominican Republic",
        "label": "Dominican Republic"
    },
    {
        "value": "Ecuador",
        "label": "Ecuador"
    },
    {
        "value": "Egypt",
        "label": "Egypt"
    },
    {
        "value": "El Salvador",
        "label": "El Salvador"
    },
    {
        "value": "Equatorial Guinea",
        "label": "Equatorial Guinea"
    },
    {
        "value": "Eritrea",
        "label": "Eritrea"
    },
    {
        "value": "Estonia",
        "label": "Estonia"
    },
    {
        "value": "Eswatini",
        "label": "Eswatini"
    },
    {
        "value": "Ethiopia",
        "label": "Ethiopia"
    },
    {
        "value": "Falkland Islands (Malvinas)",
        "label": "Falkland Islands (Malvinas)"
    },
    {
        "value": "Faroe Islands",
        "label": "Faroe Islands"
    },
    {
        "value": "Fiji",
        "label": "Fiji"
    },
    {
        "value": "Finland",
        "label": "Finland"
    },
    {
        "value": "France",
        "label": "France"
    },
    {
        "value": "French Guiana",
        "label": "French Guiana"
    },
    {
        "value": "French Polynesia",
        "label": "French Polynesia"
    },
    {
        "value": "French Southern Territories",
        "label": "French Southern Territories"
    },
    {
        "value": "Gabon",
        "label": "Gabon"
    },
    {
        "value": "Gambia",
        "label": "Gambia"
    },
    {
        "value": "Georgia",
        "label": "Georgia"
    },
    {
        "value": "Germany",
        "label": "Germany"
    },
    {
        "value": "Ghana",
        "label": "Ghana"
    },
    {
        "value": "Gibraltar",
        "label": "Gibraltar"
    },
    {
        "value": "Greece",
        "label": "Greece"
    },
    {
        "value": "Greenland",
        "label": "Greenland"
    },
    {
        "value": "Grenada",
        "label": "Grenada"
    },
    {
        "value": "Guadeloupe",
        "label": "Guadeloupe"
    },
    {
        "value": "Guam",
        "label": "Guam"
    },
    {
        "value": "Guatemala",
        "label": "Guatemala"
    },
    {
        "value": "Guernsey",
        "label": "Guernsey"
    },
    {
        "value": "Guinea",
        "label": "Guinea"
    },
    {
        "value": "Guinea-Bissau",
        "label": "Guinea-Bissau"
    },
    {
        "value": "Guyana",
        "label": "Guyana"
    },
    {
        "value": "Haiti",
        "label": "Haiti"
    },
    {
        "value": "Heard Island and McDonald Islands",
        "label": "Heard Island and McDonald Islands"
    },
    {
        "value": "Holy See",
        "label": "Holy See"
    },
    {
        "value": "Honduras",
        "label": "Honduras"
    },
    {
        "value": "Hong Kong",
        "label": "Hong Kong"
    },
    {
        "value": "Hungary",
        "label": "Hungary"
    },
    {
        "value": "Iceland",
        "label": "Iceland"
    },
    {
        "value": "India",
        "label": "India"
    },
    {
        "value": "Indonesia",
        "label": "Indonesia"
    },
    {
        "value": "Iran, Islamic Republic of",
        "label": "Iran, Islamic Republic of"
    },
    {
        "value": "Iraq",
        "label": "Iraq"
    },
    {
        "value": "Ireland",
        "label": "Ireland"
    },
    {
        "value": "Isle of Man",
        "label": "Isle of Man"
    },
    {
        "value": "Israel",
        "label": "Israel"
    },
    {
        "value": "Italy",
        "label": "Italy"
    },
    {
        "value": "Jamaica",
        "label": "Jamaica"
    },
    {
        "value": "Japan",
        "label": "Japan"
    },
    {
        "value": "Jersey",
        "label": "Jersey"
    },
    {
        "value": "Jordan",
        "label": "Jordan"
    },
    {
        "value": "Kazakhstan",
        "label": "Kazakhstan"
    },
    {
        "value": "Kenya",
        "label": "Kenya"
    },
    {
        "value": "Kiribati",
        "label": "Kiribati"
    },
    {
        "value": "Korea, Democratic People's Republic of",
        "label": "Korea, Democratic People's Republic of"
    },
    {
        "value": "Korea, Republic of",
        "label": "Korea, Republic of"
    },
    {
        "value": "Kuwait",
        "label": "Kuwait"
    },
    {
        "value": "Kyrgyzstan",
        "label": "Kyrgyzstan"
    },
    {
        "value": "Lao People's Democratic Republic",
        "label": "Lao People's Democratic Republic"
    },
    {
        "value": "Latvia",
        "label": "Latvia"
    },
    {
        "value": "Lebanon",
        "label": "Lebanon"
    },
    {
        "value": "Lesotho",
        "label": "Lesotho"
    },
    {
        "value": "Liberia",
        "label": "Liberia"
    },
    {
        "value": "Libya",
        "label": "Libya"
    },
    {
        "value": "Liechtenstein",
        "label": "Liechtenstein"
    },
    {
        "value": "Lithuania",
        "label": "Lithuania"
    },
    {
        "value": "Luxembourg",
        "label": "Luxembourg"
    },
    {
        "value": "Macao",
        "label": "Macao"
    },
    {
        "value": "Madagascar",
        "label": "Madagascar"
    },
    {
        "value": "Malawi",
        "label": "Malawi"
    },
    {
        "value": "Malaysia",
        "label": "Malaysia"
    },
    {
        "value": "Maldives",
        "label": "Maldives"
    },
    {
        "value": "Mali",
        "label": "Mali"
    },
    {
        "value": "Malta",
        "label": "Malta"
    },
    {
        "value": "Marshall Islands",
        "label": "Marshall Islands"
    },
    {
        "value": "Martinique",
        "label": "Martinique"
    },
    {
        "value": "Mauritania",
        "label": "Mauritania"
    },
    {
        "value": "Mauritius",
        "label": "Mauritius"
    },
    {
        "value": "Mayotte",
        "label": "Mayotte"
    },
    {
        "value": "Mexico",
        "label": "Mexico"
    },
    {
        "value": "Micronesia, Federated States of",
        "label": "Micronesia, Federated States of"
    },
    {
        "value": "Moldova, Republic of",
        "label": "Moldova, Republic of"
    },
    {
        "value": "Monaco",
        "label": "Monaco"
    },
    {
        "value": "Mongolia",
        "label": "Mongolia"
    },
    {
        "value": "Montenegro",
        "label": "Montenegro"
    },
    {
        "value": "Montserrat",
        "label": "Montserrat"
    },
    {
        "value": "Morocco",
        "label": "Morocco"
    },
    {
        "value": "Mozambique",
        "label": "Mozambique"
    },
    {
        "value": "Myanmar",
        "label": "Myanmar"
    },
    {
        "value": "Namibia",
        "label": "Namibia"
    },
    {
        "value": "Nauru",
        "label": "Nauru"
    },
    {
        "value": "Nepal",
        "label": "Nepal"
    },
    {
        "value": "Netherlands",
        "label": "Netherlands"
    },
    {
        "value": "New Caledonia",
        "label": "New Caledonia"
    },
    {
        "value": "New Zealand",
        "label": "New Zealand"
    },
    {
        "value": "Nicaragua",
        "label": "Nicaragua"
    },
    {
        "value": "Niger",
        "label": "Niger"
    },
    {
        "value": "Nigeria",
        "label": "Nigeria"
    },
    {
        "value": "Niue",
        "label": "Niue"
    },
    {
        "value": "Norfolk Island",
        "label": "Norfolk Island"
    },
    {
        "value": "North Macedonia",
        "label": "North Macedonia"
    },
    {
        "value": "Northern Mariana Islands",
        "label": "Northern Mariana Islands"
    },
    {
        "value": "Norway",
        "label": "Norway"
    },
    {
        "value": "Oman",
        "label": "Oman"
    },
    {
        "value": "Pakistan",
        "label": "Pakistan"
    },
    {
        "value": "Palau",
        "label": "Palau"
    },
    {
        "value": "Palestine, State of",
        "label": "Palestine, State of"
    },
    {
        "value": "Panama",
        "label": "Panama"
    },
    {
        "value": "Papua New Guinea",
        "label": "Papua New Guinea"
    },
    {
        "value": "Paraguay",
        "label": "Paraguay"
    },
    {
        "value": "Peru",
        "label": "Peru"
    },
    {
        "value": "Philippines",
        "label": "Philippines"
    },
    {
        "value": "Pitcairn",
        "label": "Pitcairn"
    },
    {
        "value": "Poland",
        "label": "Poland"
    },
    {
        "value": "Portugal",
        "label": "Portugal"
    },
    {
        "value": "Puerto Rico",
        "label": "Puerto Rico"
    },
    {
        "value": "Qatar",
        "label": "Qatar"
    },
    {
        "value": "Romania",
        "label": "Romania"
    },
    {
        "value": "Russian Federation",
        "label": "Russian Federation"
    },
    {
        "value": "Rwanda",
        "label": "Rwanda"
    },
    {
        "value": "Réunion",
        "label": "Réunion"
    },
    {
        "value": "Saint Barthélemy",
        "label": "Saint Barthélemy"
    },
    {
        "value": "Saint Helena, Ascension and Tristan da Cunha",
        "label": "Saint Helena, Ascension and Tristan da Cunha"
    },
    {
        "value": "Saint Kitts and Nevis",
        "label": "Saint Kitts and Nevis"
    },
    {
        "value": "Saint Lucia",
        "label": "Saint Lucia"
    },
    {
        "value": "Saint Martin (French part)",
        "label": "Saint Martin (French part)"
    },
    {
        "value": "Saint Pierre and Miquelon",
        "label": "Saint Pierre and Miquelon"
    },
    {
        "value": "Saint Vincent and the Grenadines",
        "label": "Saint Vincent and the Grenadines"
    },
    {
        "value": "Samoa",
        "label": "Samoa"
    },
    {
        "value": "San Marino",
        "label": "San Marino"
    },
    {
        "value": "Sao Tome and Principe",
        "label": "Sao Tome and Principe"
    },
    {
        "value": "Saudi Arabia",
        "label": "Saudi Arabia"
    },
    {
        "value": "Senegal",
        "label": "Senegal"
    },
    {
        "value": "Serbia",
        "label": "Serbia"
    },
    {
        "value": "Seychelles",
        "label": "Seychelles"
    },
    {
        "value": "Sierra Leone",
        "label": "Sierra Leone"
    },
    {
        "value": "Singapore",
        "label": "Singapore"
    },
    {
        "value": "Sint Maarten (Dutch part)",
        "label": "Sint Maarten (Dutch part)"
    },
    {
        "value": "Slovakia",
        "label": "Slovakia"
    },
    {
        "value": "Slovenia",
        "label": "Slovenia"
    },
    {
        "value": "Solomon Islands",
        "label": "Solomon Islands"
    },
    {
        "value": "Somalia",
        "label": "Somalia"
    },
    {
        "value": "South Africa",
        "label": "South Africa"
    },
    {
        "value": "South Georgia and the South Sandwich Islands",
        "label": "South Georgia and the South Sandwich Islands"
    },
    {
        "value": "South Sudan",
        "label": "South Sudan"
    },
    {
        "value": "Spain",
        "label": "Spain"
    },
    {
        "value": "Sri Lanka",
        "label": "Sri Lanka"
    },
    {
        "value": "Sudan",
        "label": "Sudan"
    },
    {
        "value": "Suriname",
        "label": "Suriname"
    },
    {
        "value": "Svalbard and Jan Mayen",
        "label": "Svalbard and Jan Mayen"
    },
    {
        "value": "Sweden",
        "label": "Sweden"
    },
    {
        "value": "Switzerland",
        "label": "Switzerland"
    },
    {
        "value": "Syrian Arab Republic",
        "label": "Syrian Arab Republic"
    },
    {
        "value": "Taiwan, Province of China",
        "label": "Taiwan, Province of China"
    },
    {
        "value": "Tajikistan",
        "label": "Tajikistan"
    },
    {
        "value": "Tanzania, United Republic of",
        "label": "Tanzania, United Republic of"
    },
    {
        "value": "Thailand",
        "label": "Thailand"
    },
    {
        "value": "Timor-Leste",
        "label": "Timor-Leste"
    },
    {
        "value": "Togo",
        "label": "Togo"
    },
    {
        "value": "Tokelau",
        "label": "Tokelau"
    },
    {
        "value": "Tonga",
        "label": "Tonga"
    },
    {
        "value": "Trinidad and Tobago",
        "label": "Trinidad and Tobago"
    },
    {
        "value": "Tunisia",
        "label": "Tunisia"
    },
    {
        "value": "Turkey",
        "label": "Turkey"
    },
    {
        "value": "Turkmenistan",
        "label": "Turkmenistan"
    },
    {
        "value": "Turks and Caicos Islands",
        "label": "Turks and Caicos Islands"
    },
    {
        "value": "Tuvalu",
        "label": "Tuvalu"
    },
    {
        "value": "Uganda",
        "label": "Uganda"
    },
    {
        "value": "Ukraine",
        "label": "Ukraine"
    },
    {
        "value": "United Arab Emirates",
        "label": "United Arab Emirates"
    },
    {
        "value": "United Kingdom",
        "label": "United Kingdom"
    },
    {
        "value": "United States Minor Outlying Islands",
        "label": "United States Minor Outlying Islands"
    },
    {
        "value": "United States",
        "label": "United States"
    },
    {
        "value": "Uruguay",
        "label": "Uruguay"
    },
    {
        "value": "Uzbekistan",
        "label": "Uzbekistan"
    },
    {
        "value": "Vanuatu",
        "label": "Vanuatu"
    },
    {
        "value": "Venezuela, Bolivarian Republic of",
        "label": "Venezuela, Bolivarian Republic of"
    },
    {
        "value": "Viet Nam",
        "label": "Viet Nam"
    },
    {
        "value": "Virgin Islands, British",
        "label": "Virgin Islands, British"
    },
    {
        "value": "Virgin Islands, U.S.",
        "label": "Virgin Islands, U.S."
    },
    {
        "value": "Wallis and Futuna",
        "label": "Wallis and Futuna"
    },
    {
        "value": "Western Sahara",
        "label": "Western Sahara"
    },
    {
        "value": "Yemen",
        "label": "Yemen"
    },
    {
        "value": "Zambia",
        "label": "Zambia"
    },
    {
        "value": "Zimbabwe",
        "label": "Zimbabwe"
    }
]



const index = ({handleClick}) => {
    return (
             <div className='sign-up'>
                <h2>Register</h2>
             <label htmlFor="firstNameSignUpInput" className="form-label">First Name</label>
            <input type="text" className="form-control" id="firstNameSignUpInput" placeholder="John"></input>
             <label htmlFor="lastNameSignUpInput" className="form-label">Last Name</label>
            <input type="text" className="form-control" id="lastNameSignUpInput" placeholder="Doe"></input>

            <label htmlFor="telSignUpInput" className="form-label">Phone</label>
            <input type="text" className="form-control" id="telSignUpInput" placeholder="+33 12345678"></input>

            <label htmlFor="emailSignUpInput" className="form-label">Email address</label>
            <input type="email" className="form-control" id="emailSignUpInput" placeholder="name@example.com"></input>
            
            <label htmlFor="passwordSignUpInput" className="form-label">Password</label>
            <input type="password" id="passwordSignUpInput" className="form-control" aria-labelledby="passwordHelpBlock"></input>
            <div id="passwordHelpBlock" className="form-text">
            Your password must be at least 8 characters long, contain letters and numbers (and ideally includes special characters).
            </div>

            <label htmlFor="adressSignUpInput" className="form-label">Address</label>
            <input type="text" className="form-control" id="adressSignUpInput" placeholder="123 street of paradise"></input>

            <label htmlFor="zipcodeSignUpInput" className="form-label">Zipcode</label>
            <input type="text" className="form-control" id="zipcodeSignUpInput" placeholder="12345"></input>

            <label htmlFor="citySignUpInput" className="form-label">City</label>
            <input type="text" className="form-control" id="citySignUpInput" placeholder="123 street of paradise"></input>

            <label htmlFor="CountrySignUpInput" className="form-label">Country</label>
            <Select placeholder="Select your country" options={options} />

            <div className="accept-terms-btn">
                <div className="accept-terms-checkbox">
            <input className="form-check-input" type="checkbox" value="" id="flexCheckChecked" />

                </div>
            <label className="form-check-label" htmlFor="flexCheckChecked">By clicking on the 'Create account' button, you are acknowledging that you have read and agreed to the terms and conditions of this app. </label>
            </div>
             <button type="submit" className='btn-login'>Create account</button>
            <span className='link-to-register' onClick={handleClick}>No account yet ? Sign up right now</span>
        </div>

    );
};

export default index;