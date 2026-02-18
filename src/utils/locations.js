export const districts = [
    { name: 'Dhaka', delivery_charge: 60, thanas: ['Dhanmondi', 'Gulshan', 'Banani', 'Uttara', 'Mirpur', 'Mohammadpur', 'Badda', 'Khilgaon'] },
    { name: 'Chittagong', delivery_charge: 120, thanas: ['Pahartali', 'Panchlaish', 'Bakalia', 'Kotwali', 'Halishahar'] },
    { name: 'Gazipur', delivery_charge: 120, thanas: ['Sreepur', 'Kaliakair', 'Kapasia', 'Tonghi'] },
    { name: 'Narayanganj', delivery_charge: 120, thanas: ['Siddhirganj', 'Rupganj', 'Sonargaon'] },
    { name: 'Sylhet', delivery_charge: 120, thanas: ['Sylhet Sadar', 'Beanibazar', 'Golapganj'] },
    // Add more districts as needed
];

export const getDeliveryCharge = (districtName) => {
    const district = districts.find(d => d.name === districtName);
    return district ? district.delivery_charge : 120; // Default to outside Dhaka charge
};
