import axios from "axios";

// const BASE_URL = "http://52.66.30.159:8080/api";
const BASE_URL = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api`
const createApiEndpoint = (endpoint) => `${BASE_URL}/${endpoint}`;
if (typeof window !== "undefined") {
  var id = localStorage.getItem("deviceId");
  // console.log("id",id);
}
export const fetchRecommendedProduct = async () => {
  try {
    const response = await axios.get(createApiEndpoint(`getRecommendation?deviceId=${id}`));
    console.log(response.dat)
    return response.data;
  } catch (err) {
    // console.error(err);
  }
};

export const fetchSliderView = async (page,limit) => {
  try {
    const response = await axios.get(createApiEndpoint("getImgCircle?limit="+limit+"&page="+page));
    // console.log("response",response.data);
    return response.data;
  } catch (err) {
    console.error(err);
  }
};

export const fetchProductsWithSearch = async (searchQuery) => {
  try {
    const response = await axios.get(createApiEndpoint("products"), {
      params: {
        search: searchQuery,
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

export const fetchFirstImgCardSlider = async () => {
  try {
    const response = await axios.get(createApiEndpoint("trending-products"));
    return response.data;
  } catch (error) {
    console.error(`Error fetching slider: ${error.message}`);
    throw error;
  }
};
export const fetchProfileContent = async () => {
  try {
    const response = await axios.get(createApiEndpoint("profileContent"));
    return response.data;
  } catch (error) {
    console.error(`Error fetching profile content: ${error.message}`);
    throw error;
  }
}

export const fetchCartData=async()=>{
  try {
    const response=await axios.get(createApiEndpoint("cart"));
    return response.data;
  } catch (error) {
    console.error(`Error fetching cart content: ${error.message} `);
    throw error;
  }
}
export const virtualGet=async()=>{
  try{
    const response=await axios.get(createApiEndpoint("getVE"));
    return response.data;
  }catch(error){
    console.error(`Error fetching virtual content: ${error.message} `);
    throw error;
  }
}
export const multiCardData=async()=>{
  try{
    const response=await axios.get(createApiEndpoint("getHeaderInfoSection"));
    return response.data;
  }
  catch(error){
    console.error(`Error fetching multicard content: ${error.message}`);
    throw error;
  }
}

export const fetchMusicData = async () => {
  try {
    const response = await axios.get(createApiEndpoint("getStaticSection"));
    return response.data;
  } catch (error) {
    console.error(`Error fetching music data : ${error.message}`);
    throw error;
  }
}

export const fetchFirstImageChangerData = async () => {
  try {
    const response = await axios.get(createApiEndpoint("getImgChanger"));
    console.log("Image Changer data : ",response.data);
    return response.data;
  } catch (error) {
    console.error(`Error fetching music data : ${error.message}`);
    throw error;
  }
}