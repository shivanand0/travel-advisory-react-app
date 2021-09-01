import axios from 'axios';

// const options = {
//   method: 'GET', //we're using axios so automatically method will be GET so we don't have to use that
//   url: 'https://travel-advisor.p.rapidapi.com/restaurants/list-in-boundary',
//   params: {
//     bl_latitude: '11.847676',
//     tr_latitude: '12.838442',
//     bl_longitude: '109.095887',
//     tr_longitude: '109.149359',
//     // restaurant_tagcategory_standalone: '10591',
//     // restaurant_tagcategory: '10591',
//     // limit: '30',
//     // currency: 'USD',
//     // open_now: 'false',
//     // lunit: 'km',
//     // lang: 'en_US'
//   },
//   headers: {
//     'x-rapidapi-host': 'travel-advisor.p.rapidapi.com',
//     'x-rapidapi-key': '02579b861cmsha622575fe8dfa3cp1bdf56jsnfedd329c42d4'
//   }
// };

// axios.request(options).then(function (response) {
// 	console.log(response.data);
// }).catch(function (error) {
// 	console.error(error);
// });

export const getPlacesData = async (type, sw, ne) => 
{
    try 
    {
        //request - if request is succesful then code runs as it's supposed to run inside try block
        //but if request fails code is redirected to catch error block
        const { data: { data } } = await  axios.get(`https://travel-advisor.p.rapidapi.com/${type}/list-in-boundary`, {
              params: {
                bl_latitude: sw.lat,
                tr_latitude: ne.lat,
                bl_longitude: sw.lng,
                tr_longitude: ne.lng,
              },
              headers: {
                //1
                // 'x-rapidapi-host': 'travel-advisor.p.rapidapi.com',
                // 'x-rapidapi-key': '02579b861cmsha622575fe8dfa3cp1bdf56jsnfedd329c42d4'
                //2
                // 'x-rapidapi-host': 'travel-advisor.p.rapidapi.com',
                // 'x-rapidapi-key': 'c2e1caf95emshaf222a66e614789p1bd49ejsnc52b4ed35fc3'
                //3
                'x-rapidapi-host': 'travel-advisor.p.rapidapi.com',
                'x-rapidapi-key': 'e0d0170718mshfe5e9843c9eef95p13db01jsn2d742f3fd2f5'
              }
            });
        return data;
    } 
    catch (error) 
    {
        console.log(error);
    }
}