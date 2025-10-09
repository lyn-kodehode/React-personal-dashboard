import { useState, useEffect } from "react";

export default function useFetch(url, options = {}) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // dont fetch if URL is null/undefined
    if (!url) {
      setLoading(false);
      return;
    }
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(url, options);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setData(data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, loading, error };
}

// --------------------------------------------------------

// export default function useFetch(url, options = {}) {
//   const [data, setData] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   const fetchData = async () => {
//     if (!url) return;

//     setLoading(true);
//     setError(null);

//     try {
//       const response = await fetch(url, options);

//       if (!response.ok) {
//         throw new Error(`Error ${response.status}: ${response.statusText}`);
//       }
//       const data = await response.json();
//       setData(data);
//     } catch (error) {
//       setError(error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // prevents memory leaks
//   useEffect(() => {
//     // flag to avoid state updates when component unmounts
//     let canUpdateState = true;

//     const fetchDataSafe = async () => {
//       if (!url) return;

//       setLoading(true);
//       setError(null);

//       try {
//         console.log("🔍 About to fetch URL:", url);
//         console.log("🔍 Options:", options);
//         console.log("🔍 URL type:", typeof url);
//         console.log("🔍 URL length:", url?.length);

//         // Add a small delay to see if it's a timing issue
//         await new Promise((resolve) => setTimeout(resolve, 100));

//         console.log("🚀 About to call fetch...");
//         const response = await fetch(url, options);
//         console.log("📡 Response status:", response.status);
//         console.log("📡 Response headers:", response.headers);
//         console.log("📡 Response ok:", response.ok);

//         if (!response.ok) {
//           throw new Error(`Error ${response.status}: ${response.statusText}`);
//         }

//         const data = await response.json();
//         if (canUpdateState) setData(data);
//         console.log("✅ Data received:", data);
//       } catch (error) {
//         if (canUpdateState) setError(error);
//       } finally {
//         if (canUpdateState) setLoading(false);
//       }
//     };

//     fetchDataSafe();

//     // cleanup function
//     return () => {
//       canUpdateState = false;
//     };
//   }, [url]);

//   // returns the refect function so components can manually trigger it
//   return { data, loading, error, refetch: fetchData };
// }

// -----------------------------------------------------
// HOW TO USE INSIDE A COMPONENT
// import {useFetch} from '../hooks/useFetch'

// export default function ComponentName() {

//     const {data, loading, error} = useFetch('API URL', {options: headers, method});

//     if(loading) return <p>Loading...</p>
//     if(error) return <p>Error: {error}</p>

//     return <p>{data.value</p>
// }

// INTERVALS
// const intervals = {
//   weather: 15 * 60 * 1000,    // 15 minutes - weather changes slowly
//   stocks: 5 * 60 * 1000,      // 5 minutes - stocks change faster
//   news: 30 * 60 * 1000,       // 30 minutes - news updates less frequently
//   crypto: 2 * 60 * 1000,      // 2 minutes - crypto is very volatile
// };

// API RESPONSE TYPES
/* 
1. array: [item1, item2, item3]
data?map(item=>{})

2. object with an array: {items: [item1, item2]} 
 data?items?.map(item=>{})

3. single object:  {name: 'John, age:24}
data?.name

4. nested object : { user: {
                            profile: { 
                            name: "John" } } }
date?.user?.profile?.name
*/
