const parkingSpots = [
    {
        name: "חניון גולדה",
        address: "ברקוביץ 7, תל-אביב יפו, ישראל",
        url: "https://www.ahuzot.co.il/Parking/ParkingDetails/?ID=10",
        lat: 32.07778835498033,
        lon: 34.78581838351991
    },
    {
        name: "חניון חברה חדשה",
        address: "חברה חדשה 9, תל-אביב יפו, ישראל",
        url: "https://www.ahuzot.co.il/Parking/ParkingDetails/?ID=4",
        lat: 32.08538689200202,
        lon: 34.79074434232926
    },
    {
        name: "חניון מונטיפיורי",
        address: "מונטיפיורי 5, תל-אביב יפו, ישראל",
        url: "https://www.ahuzot.co.il/Parking/ParkingDetails/?ID=29",
        lat: 32.0649168244379,
        lon: 34.76942788167214
    },
    {
        name: "חניון מפעל הפיס",
        address: "ליאונרדו דה וינצ'י 5, תל-אביב יפו, ישראל",
        url: "https://www.ahuzot.co.il/Parking/ParkingDetails/?ID=31",
        lat: 32.07283976623353,
        lon: 34.78457819701373
    },
    {
        name: "חניון ספיר",
        address: "אליהו ספיר, תל-אביב יפו, ישראל",
        url: "https://www.ahuzot.co.il/Parking/ParkingDetails/?ID=74",
        lat: 32.07786946788388,
        lon: 34.775297343022935
    },
    {
        name: "חניון קצה השדרה",
        address: "שדרות רוטשילד 1, תל-אביב יפו, ישראל",
        url: "https://www.ahuzot.co.il/Parking/ParkingDetails/?ID=135",
        lat: 32.063130658555224,
        lon: 34.76920629701363
    },
    {
        name: "חניון תל-נורדאו",
        address: "פרישמן 28, תל-אביב יפו, ישראל",
        url: "https://www.ahuzot.co.il/Parking/ParkingDetails/?ID=45",
        lat: 32.07987469617332,
        lon: 34.77175081050777
    },
    {
        name: "חניון אסותא",
        address: "ז'בוטינסקי 62, תל-אביב יפו, ישראל",
        url: "https://www.ahuzot.co.il/Parking/ParkingDetails/?ID=122",
        lat: 32.08857162867665,
        lon: 34.77986759516656
    },
    {
        name: "חניון ארלוזורוב - חנה וסע",
        address: "יעקב דורי, תל-אביב יפו, ישראל",
        url: "https://www.ahuzot.co.il/Parking/ParkingDetails/?ID=1",
        lat: 32.084901,
        lon: 34.798467
    },
    {
        name: "חניון ארלוזורוב 17",
        address: "ארלוזורוב 17, תל-אביב יפו, ישראל",
        url: "https://www.ahuzot.co.il/Parking/ParkingDetails/?ID=123",
        lat: 32.08744,
        lon: 34.77442
    },
    {
        name: "חניון בזל",
        address: "אשתורי הפרחי 5, תל-אביב יפו, ישראל",
        url: "https://www.ahuzot.co.il/Parking/ParkingDetails/?ID=3",
        lat: 32.09006351836992,
        lon: 34.780105341191124
    },
    {
        name: "חניון בית הדר",
        address: "הרכבת 3, תל-אביב יפו, ישראל",
        url: "https://www.ahuzot.co.il/Parking/ParkingDetails/?ID=93",
        lat: 32.06415883250118,
        lon: 34.77706618351952
    },
    {
        name: "חניון ברוריה",
        address: "יגאל אלון 151, תל-אביב יפו, ישראל",
        url: "https://www.ahuzot.co.il/Parking/ParkingDetails/?ID=8",
        lat: 32.070719,
        lon: 34.798164
    },
    {

        name: "חניון גלי גיל",
        address: "2370 מס' 3, תל-אביב יפו, ישראל",
        url: "https://www.ahuzot.co.il/Parking/ParkingDetails/?ID=12",
        lat: 32.093276,
        lon: 34.788782
    },
    {
        name: "חניון דובנוב",
        address: "דובנוב 4, תל-אביב יפו, ישראל",
        url: "https://www.ahuzot.co.il/Parking/ParkingDetails/?ID=15",
        lat: 32.074123,
        lon: 34.785890
    },
    {
        name: "חניון החשמל",
        address: "לבונטין 20, תל-אביב יפו, ישראל",
        url: "https://www.ahuzot.co.il/Parking/ParkingDetails/?ID=18",
        lat: 32.061421,
        lon: 34.771312
    },
    {
        name: "חניון המערכה",
        address: "המערכה 10, תל-אביב יפו, ישראל",
        url: "https://www.ahuzot.co.il/Parking/ParkingDetails/?ID=77",
        lat: 32.06163610039797,
        lon: 34.79317691231515
    },
    {
        name: "חניון הצפירה 1",
        address: "הצפירה 2, תל-אביב יפו, ישראל",
        url: "https://www.ahuzot.co.il/Parking/ParkingDetails/?ID=19",
        lat: 32.0615,
        lon: 34.7798
    },
    {
        name: "חניון הצפירה 2",
        address: "הצפירה 8, תל-אביב יפו, ישראל",
        url: "https://www.ahuzot.co.il/Parking/ParkingDetails/?ID=20",
        lat: 32.0618,
        lon: 34.7802
    },
    {
        name: "חניון הרב קוק",
        address: "הרב קוק פינת הארי, תל-אביב יפו, ישראל",
        url: "https://www.ahuzot.co.il/Parking/ParkingDetails/?ID=57",
        lat: 32.07089,
        lon: 34.7682
    },
    {
        name: "חניון התקומה",
        address: "המרד 36, תל-אביב יפו, ישראל",
        url: "https://www.ahuzot.co.il/Parking/ParkingDetails/?ID=44",
        lat: 32.0639,
        lon: 34.7622
    },
    {
        name: "חניון התרבות",
        address: "הוברמן 1, תל-אביב יפו, ישראל",
        url: "https://www.ahuzot.co.il/Parking/ParkingDetails/?ID=94",
        lat: 32.0725,
        lon: 34.7791
    },
    {
        name: "חניון וולפסון",
        address: "השלום 120, תל-אביב יפו, ישראל",
        url: "https://www.ahuzot.co.il/Parking/ParkingDetails/?ID=78",
        lat: 32.0701,
        lon: 34.7923
    },
    {
        name: "חניון וולפסון 2",
        address: "הטייסים 39, תל-אביב יפו, ישראל",
        url: "https://www.ahuzot.co.il/Parking/ParkingDetails/?ID=89",
        lat: 32.056,
        lon: 34.807
    },
    {
        name: "חניון כרמל 1",
        address: "קלישר פינת הכרמל, תל-אביב יפו, ישראל",
        url: "https://www.ahuzot.co.il/Parking/ParkingDetails/?ID=24",
        lat: 32.0682,
        lon: 34.7671
    },
    {
        name: "חניון כרמל 2",
        address: "סמטת הכרמל 12, תל-אביב יפו, ישראל",
        url: "https://www.ahuzot.co.il/Parking/ParkingDetails/?ID=114",
        lat: 32.0685,
        lon: 34.7674
    },
    {
        name: "חניון לולאה",
        address: "פרשת דרכים 10, תל-אביב יפו, ישראל",
        url: "https://www.ahuzot.co.il/Parking/ParkingDetails/?ID=26",
        lat: 32.08181,
        lon: 34.79951
    },
    {
        name: "חניון סינרמה",
        address: "יצחק שדה 45, תל-אביב יפו, ישראל",
        url: "https://www.ahuzot.co.il/Parking/ParkingDetails/?ID=37",
        lat: 32.0708,
        lon: 34.7902
    },
    {
        name: "חניון סעדיה גאון",
        address: "ציקלג 7, תל-אביב יפו, ישראל",
        url: "https://www.ahuzot.co.il/Parking/ParkingDetails/?ID=38",
        lat: 32.0712,
        lon: 34.7915
    },
    {
        name: "חניון פליטי הספר",
        address: "פליטי הספר פינת דם המכבים, תל-אביב יפו, ישראל",
        url: "https://www.ahuzot.co.il/Parking/ParkingDetails/?ID=75",
        lat: 32.0715,
        lon: 34.7928
    },
    {
        name: "חניון פלמ״ח",
        address: "יגאל אלון 68, תל-אביב יפו, ישראל",
        url: "https://www.ahuzot.co.il/Parking/ParkingDetails/?ID=39",
        lat: 32.0718,
        lon: 34.7941
    },
    {
        name: "חניון צמרות",
        address: "רחוב אלכסנדר בוסקוביץ 1, תל-אביב יפו, ישראל",
        url: "https://www.ahuzot.co.il/Parking/ParkingDetails/?ID=127",
        lat: 32.0720,
        lon: 34.7953
    },
    {
        name: "חניון רבניצקי",
        address: "רבניצקי 6, תל-אביב יפו, ישראל",
        url: "https://www.ahuzot.co.il/Parking/ParkingDetails/?ID=40",
        lat: 32.0723,
        lon: 34.7965
    },
    {
        name: "חניון רמז-ארלוזורוב",
        address: "רמז 1, תל-אביב יפו, ישראל",
        url: "https://www.ahuzot.co.il/Parking/ParkingDetails/?ID=131",
        lat: 32.0725,
        lon: 34.7978
    }

    
];

export default parkingSpots;