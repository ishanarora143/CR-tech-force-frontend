import AmbulanceIcon from '../global/assets/card icons/ambulance_card.svg';
import FoodIcon from '../global/assets/card icons/food_card.svg';
import HomeIcon from '../global/assets/card icons/home_card.svg';
import HospitalIcon from '../global/assets/card icons/hospital_card.svg';
import MedicineIcon from '../global/assets/card icons/medicine_card.svg';
import OxygenIcon from '../global/assets/card icons/oxygen_card.svg';
import TestIcon from '../global/assets/card icons/test_card.svg';
import BloodIcon from '../global/assets/card icons/blood_card.svg';

const resourceData = [{
    resource: 'Oxygen',
    iconSrc: OxygenIcon,
    subtypes: [
        'New Cylinder', 
        'Refill', 
        'Concentrator'
    ]}, {
    resource:
        'Hospital Beds',
    iconSrc: HospitalIcon,
    subtypes: [
        'ICU Bed', 'Ventilator Bed', 'Oxygen Beds', 'Non-Oxygen Beds'
    ]}, {
    resource:
        'Medicines/Injections',
    iconSrc: MedicineIcon,
    subtypes: [
        'Remdesivir', 'Fabiflu', 'Tocilizumab'
    ]}, {
    resource:
        'Blood',
    iconSrc: BloodIcon,
    subtypes: [
        'Plasma', 'Blood'
    ]}, {
    resource:
        'Home Care',
    iconSrc: HomeIcon,
    subtypes: [
        'Home ICU Setup', 'Nursing Staff'
    ]}, {
    resource:
        'Testing',
    iconSrc: TestIcon,
    subtypes: [
        'Home Testing', 'Lab Testing'
    ]}, {
    resource:
        'Food / Tiffin',
    iconSrc: FoodIcon,
    subtypes: [
        'Tiffin Service', 'Meal Provider'
    ]}, {
    resource:
        'Ambulances',
    iconSrc: AmbulanceIcon,
    subtypes: [
        'Normal / Advanced Life Support'
    ]}
]

export default resourceData;