import { useEffect, useState } from "react";

export const useFech = (url) => {
  const [state, setState] = useState({
    data: [],
    isLoading: true,
    errors: null
  });

  useEffect(()=>{
    if(!url) return;
    const getFech = async()=>{
      try {
        const response = await fetch(url);
        const data = await response.json();
        setState({
          data:data,
          isLoading: false,
          errors:null
        });
      } catch (error) {
        setState({
          data:[],
          isLoading: false,
          errors:error
        });
      }
    }
    getFech();
  },[url]);

  const {data,isLoading,errors} = state;
  
  return {data,isLoading,errors};
};
