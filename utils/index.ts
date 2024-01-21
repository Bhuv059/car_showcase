import { CarProps, FilterProps } from "@/types";
/*
export async function fetchCars(filters : FilterProps) {
  const headers = {
    'X-RapidAPI-Key': 'f87580ac8dmsh4e0ec3b45c6f9e0p1c71c8jsnac79c765309e',
    'X-RapidAPI-Host': 'cars-by-api-ninjas.p.rapidapi.com'
  }

  const response  = await fetch(`https://cars-by-api-ninjas.p.rapidapi.com/v1/cars?model=q3&make=audi&fuel_type=gas`,
                                 {headers: headers,}
  )

  const result = await response.json()
  return result
}
    */

export async function fetchCars(filters : FilterProps) {
    const {manufacturer, year, model, limit, fuel} = filters;
    const headers = {
      'X-RapidAPI-Key': 'f87580ac8dmsh4e0ec3b45c6f9e0p1c71c8jsnac79c765309e',
      'X-RapidAPI-Host': 'cars-by-api-ninjas.p.rapidapi.com'
    }
   

    const response  = await fetch(`https://cars-by-api-ninjas.p.rapidapi.com/v1/cars?make=${manufacturer}&model=${model}&year=${year}&limit=${limit}&fuel_type=${fuel}`, {headers: headers,}
    )

    const result = await response.json()
    return result
}

export const calculateCarRent = (city_mpg: number, year: number) => {
    const basePricePerDay = 50; // Base rental price per day in dollars
    const mileageFactor = 0.1; // Additional rate per mile driven
    const ageFactor = 0.05; // Additional rate per year of vehicle age

    // Calculate additional rate based on mileage and age
    const mileageRate = city_mpg * mileageFactor;
    const ageRate = (new Date().getFullYear() - year) * ageFactor;

    // Calculate total rental rate per day
    const rentalRatePerDay = basePricePerDay + mileageRate + ageRate;

    return rentalRatePerDay.toFixed(0);
};

export const generateCarImageUrl = (car: CarProps, angle?: string) => {
  const url = new URL("https://cdn.imagin.studio/getimage");
  const { make, model, year } = car;

  //url.searchParams.append('customer', process.env.NEXT_PUBLIC_IMAGIN_API_KEY || '');
  url.searchParams.append('customer', 'hrjavascript-mastery');
  url.searchParams.append('make', make);
  url.searchParams.append('modelFamily', model.split(" ")[0]);
  url.searchParams.append('zoomType', 'fullscreen');
  url.searchParams.append('modelYear', `${year}`);
  // url.searchParams.append('zoomLevel', zoomLevel);
  url.searchParams.append('angle', `${angle}`);

  return `${url}`;
} 


export const updateSearchParams = (type: string, value: string) => {
    const searchPararms = new URLSearchParams(window.location.search)
    searchPararms.set(type, value)
    const newPathname = `${window.location.pathname}?${searchPararms.toString()}`
    return newPathname;
}