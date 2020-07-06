import { addListener } from "expo/build/Updates/Updates";
import { ACTION_SHOW_ADMIN_SUPPORT_DETAILS } from "expo-intent-launcher";

const data = [
    {
        name: "Savska",
        coords: {
            "latitude": 45.827516,
            "longitude": 16.140521
        },
        working_hours: {
            "lunch":"10:30 – 16:00",
            "dinner": "17:30 – 20:30",
            "weekend": {
                "saturday": "Not Working",
                "sunday": "Not Working",
            },
            "additional-notes": "On Friday works until 16:00 "
        } 
    },
    {
        name: "SD S. Radić",
        coords: {
            "latitude": 45.827748,
            "longitude": 16.098970
        }
    },
    {
        name: "SD Lašćina",
        coords: {
            "latitude": 45.8242699,
            "longitude": 16.1184532
        }
    },
    {
        name: "SD Cvjetno naselje",
        coords: {
            "latitude": 45.823895,
            "longitude": 16.1308971
        }
    },
    {
        name: "ZUK Borongaj",
        coords: {
            "latitude": 45.823895,
            "longitude": 16.1308971
        }
    },
    {
        name: "Ekonomija",
        coords: {
            "latitude": 45.823895,
            "longitude": 16.1308971
        }
    },
    {
        name: "Veterina",
        coords: {
            "latitude": 45.823895,
            "longitude": 16.1308971
        }
    },
    {
        name: "Šumarstvo",
        coords: {
            "latitude": 45.823895,
            "longitude": 16.1308971
        }
    },
    {
        name: "FSB",
        coords: {
            "latitude": 45.823895,
            "longitude": 16.1308971
        }
    },
    {
        name: "ALU",
        coords: {
            "latitude": 45.823895,
            "longitude": 16.1308971
        }
    },
    {
        name: "Restoran TTF",
        coords: {
            "latitude": 45.823895,
            "longitude": 16.1308971
        }
    },
    {
        name: "Restoran TVZ",
        coords: {
            "latitude": 45.823895,
            "longitude": 16.1308971
        }
    },
    {
        name: "Restoran NSK",
        coords: {
            "latitude": 45.823895,
            "longitude": 16.1308971
        }
    },
    {
        name: "Restoran Filozofski",
        coords: {
            "latitude": 45.823895,
            "longitude": 16.1308971
        }
    },
]
export default data;
