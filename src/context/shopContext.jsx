import React, { createContext, useState, useContext, useEffect } from "react";
import { auth, db } from "../myfirebase/firebase-config";
import { onAuthStateChanged } from "firebase/auth";
import { getDocs, collection,setDoc,updateDoc,doc,getDoc } from "firebase/firestore";

export const ShopContext = createContext(null);

export function useAuth() {
  return useContext(ShopContext);
}

export const ShopContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [productlist, setProductlist] = useState([]);
  const [salelist,setsalelist] = useState([]);
  const [cartItems, setCartItems] = useState({});
  let [paymentdone , setpaymentdone] = useState(false);
  const [payingstatus,setpayingstatus] = useState(false);
  const [useremail,setuseremail] = useState("");
  const [usercomment,setusercomment] = useState("");
  const [userphone,setuserphone] = useState("");
  const [useraddress,setuseraddress] = useState("");
  const [username,setusername] = useState("");
  const [commentlist,setcommentlist] = useState([]);
  const [loadingpage,setloadingpage] = useState(true);
  const [totalAmount,settotalAmount] = useState();
  const [changebackground,setchangebackground] = useState(false);
  const [totalproductnumber,settotalproductnumer]= useState();
  const [speaktosale,setspeaktosale] = useState(false);
  const [cartposition,setcartposition] = useState();
  


  const initializeUser = (user) => {
    if (user) {
      setCurrentUser({ ...user });
      setUserLoggedIn(true);
    } else {
      setCurrentUser(null);
      setUserLoggedIn(false);
    }
    setLoading(false);
  };


  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, initializeUser);
    return unsubscribe;
  }, []);

  useEffect(() => {
    const getcommentlist = async () => {
      try {
        const data2 = await getDocs(collection(db, "comments"));
        const filtereddata2 = data2.docs.map((doc) => ({
          ...doc.data()
        }));
        setcommentlist(filtereddata2);
      } catch (error) {
        console.log(error);
      }
    };
    getcommentlist();
  }, []);

  const onchangecommentlist = async () => {
    try {
      // console.log(`changing comment`)
      const data2 = await getDocs(collection(db, "comments"));
      const filtereddata2 = data2.docs.map((doc) => ({
        ...doc.data()
      }));
      setcommentlist(filtereddata2);
    } catch (error) {
      console.log(error);
    }
  }
  
  // console.log(JSON.stringify(commentlist));

  useEffect(() => {
    const getProductlist = async () => {
      try {
        const data = await getDocs(collection(db, "production"));
        const filteredData = data.docs.map((doc) => ({
          ...doc.data(),
          id: parseInt(doc.id),
        }));
        const data2 = await getDocs(collection(db, "hot-sales"));
        const filteredData2 = data2.docs.map((doc) => ({
          ...doc.data(),
          id: parseInt(doc.id),
        }));
        setsalelist(filteredData2);
        setProductlist(filteredData);
        setloadingpage(false);
      } catch (error) {
        console.error(error);
      }
    };
    getProductlist();
  }, []);
  // console.log(JSON.stringify(productlist));
    // console.log(JSON.stringify(salelist));

      const getDefaultCart = async () => {
        let cart = {};
        for (let i = 0; i < productlist.length + salelist.length; i++) {
          if(i < productlist.length){
            cart[productlist[i].id] = 0;
            // console.log(`cart in default : ${JSON.stringify(cart)}`);
          }
          else{
            for( let y = 0 ; y < salelist.length ; y++ ){
              cart[salelist[y].id] = 0;
             // console.log(`cart in default : ${JSON.stringify(cart)}`);
            }
        } 
      }
      const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toUTCString();
      // console.log(`cart : ${cart}`)
      const cartString = JSON.stringify(cart);
      // console.log(`cartstring: ${(cartString)}`);
      document.cookie = `cartItems=${cartString}; expires=${expires}`;
      const cookieValue = document.cookie.split('; ').find(cookie => cookie.startsWith('cartItems='));
      const cartItemsString = cookieValue ? cookieValue.substring(cookieValue.indexOf('=') + 1) : null;
      setCartItems(cartItemsString ? JSON.parse(cartItemsString) : {});
    };
    const clearAllCookies = () => {
      const cookies = document.cookie.split('; ');
      for (let i = 0; i < cookies.length; i++) {
          const cookieParts = cookies[i].split('=');
          const cookieName = cookieParts[0];
          if (cookieName === 'cartItems') {
              document.cookie = `${cookieName}=; expires=, 01 Jan 1970 00:00:00 GMT; path=/`;
          }
      }
    };
    const clearLocalStorage = () => {
      localStorage.removeItem('accesscomment');
      // Add more lines here to remove other items from localStorage if needed
      // console.log('localStorage cleared');
    };
  
  // clearLocalStorage();
  // clearAllCookies();

  useEffect(() => {
    const checkdocumentcookie = async () => {
      if(!document.cookie.includes('cartItems=')){
        try{
          // console.log(`hello`)
          await clearAllCookies();
          // console.log(`waiting 1`)
          // console.log(`waiting 2`);
        }catch(error){
          console.log(error);
        }
        let cart = {};
        for (let i = 0; i < productlist.length + salelist.length; i++) {
          if(i < productlist.length){
            cart[productlist[i].id] = 0;
            // console.log(`cart in default : ${JSON.stringify(cart)}`);
          }
          else{
            for( let y = 0 ; y < salelist.length ; y++ ){
              cart[salelist[y].id] = 0;
              // console.log(`cart in default : ${JSON.stringify(cart)}`);
            }
          }
        }
        const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toUTCString();
        // console.log(`cart : ${cart}`)
        const cartString = JSON.stringify(cart);
        // console.log(`cartstring: ${(cartString)}`);
        document.cookie = `cartItems=${cartString}; expires=${expires}`;
        // console.log(`document.cookie : ${document.cookie}`);
      }else{
        // console.log(`bye`);
        const cookieValue = document.cookie.split('; ').find(cookie => cookie.startsWith('cartItems='));
        const cartItemsString = cookieValue ? cookieValue.substring(cookieValue.indexOf('=') + 1) : null;
        setCartItems(cartItemsString ? JSON.parse(cartItemsString) : {});
      }
    }
    checkdocumentcookie();
  }, [productlist,salelist]);

  const gettotalproductnumber = () => {
    let totalAmount = 0;
    for( var key in cartItems){
      totalAmount = totalAmount + cartItems[key];
    }
    return totalAmount;
  }
  const getTotalCartAmount = () => {
    let totalAmount = 0;
    // console.log(`cart in total : ${JSON.stringify(cartItems)}`);
    if (productlist && productlist.length > 0) {
      for (const item in cartItems) {
        if (cartItems[item] > 0) {
          const itemInfo = productlist.find((product) => product.id === Number(item)) || salelist.find((sale) => sale.id === Number(item));
          if (itemInfo && itemInfo.price) {
            totalAmount += cartItems[item] * itemInfo.price;
          }
        }
      }
    }
    // console.log(`totalamount : ${totalAmount}`);
    return totalAmount;
  };

  useEffect(() =>{
    settotalAmount(getTotalCartAmount());
    settotalproductnumer(gettotalproductnumber());
  },[cartItems])

  // console.log(`totalproductnumber : ${totalproductnumber}`);

  const addToCart = (itemId) => {
    const cookieValue = document.cookie.split('; ').find(cookie => cookie.startsWith('cartItems='));
    let cartItems = {};
    if (cookieValue) {
        const cartItemsString = cookieValue.split('=')[1];
        cartItems = JSON.parse(cartItemsString);
        // console.log(`cartitemsjsondata : ${JSON.stringify(cartItems)}`);
      }
    cartItems[itemId] = (cartItems[itemId] || 0) + 1;
    const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toUTCString();
    document.cookie = `cartItems=${JSON.stringify(cartItems)}; expires=${expires}; path=/`;
    // console.log(`document.cookie after add : ${document.cookie}`);
    const cookieValue2 = document.cookie.split('; ').find(cookie => cookie.startsWith('cartItems='));
    const cartItemsString = cookieValue2 ? cookieValue2.substring(cookieValue2.indexOf('=') + 1) : null;
    setCartItems(cartItemsString ? JSON.parse(cartItemsString) : {});    
    // console.log(`cart1 after add : ${JSON.stringify(cartItems)}`);
  };

  const removeFromCart = (itemId) => {
    const cookieValue = document.cookie.split('; ').find(cookie => cookie.startsWith('cartItems='));
    let cartItems = {};
    if (cookieValue) {
        const cartItemsString = cookieValue.split('=')[1];
        cartItems = JSON.parse(cartItemsString);
    }
    cartItems[itemId] = (cartItems[itemId] || 0) - 1;
    const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toUTCString();
    document.cookie = `cartItems=${JSON.stringify(cartItems)}; expires=${expires}; path=/`;
    // console.log(`document.cookie after add : ${document.cookie}`);
    const cookieValue2 = document.cookie.split('; ').find(cookie => cookie.startsWith('cartItems='));
    const cartItemsString = cookieValue2 ? cookieValue2.substring(cookieValue2.indexOf('=') + 1) : null;
    setCartItems(cartItemsString ? JSON.parse(cartItemsString) : {});    
    // console.log(`cart1 after add : ${JSON.stringify(cartItems)}`);
  };

  const updateCartItemAmount = (newAmount, itemId) => {
    const cookieValue = document.cookie.split('; ').find(cookie => cookie.startsWith('cartItems='));
    let cartItems = {};
    if (cookieValue) {
        const cartItemsString = cookieValue.split('=')[1];
        cartItems = JSON.parse(cartItemsString);
    }
    cartItems[itemId] = newAmount;
    const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toUTCString();
    document.cookie = `cartItems=${JSON.stringify(cartItems)}; expires=${expires}; path=/`;
    // console.log(`document.cookie after add : ${document.cookie}`);
    const cookieValue2 = document.cookie.split('; ').find(cookie => cookie.startsWith('cartItems='));
    const cartItemsString = cookieValue2 ? cookieValue2.substring(cookieValue2.indexOf('=') + 1) : null;
    setCartItems(cartItemsString ? JSON.parse(cartItemsString) : {});    
    // console.log(`cart1 after add : ${JSON.stringify(cartItems)}`);
  };

  // console.log(`cart1 : ${JSON.stringify(cartItems)}`);
  // console.log(`document.cookie: ${document.cookie}`);

  //submit order function
  const getCurrentDate = () => {
    const now = new Date();
    const day = String(now.getDate()).padStart(2, '0');
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const year = now.getFullYear();
    return `${year}-${month}-${day}`;
  };

  const getCurrentDateTime = () => {
    const now = new Date();
    const day = String(now.getDate()).padStart(2, '0');
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const year = now.getFullYear();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};

const onsubmitproduct = async (product, currentdate) => {
  try {
      const documentPath = auth?.currentUser?.email ?  `${currentdate}_${auth.currentUser.email}` : `${currentdate}_${useremail}`;
      const productDoc = doc(db, "orders", documentPath);
      const cartItemValue = cartItems[product.id] || 0;
      const dataToUpdate = {
          [product.id]: {
              productName: product.name,
              quantity: cartItemValue,
              totalPrice: cartItemValue * product.price
          }
      };
      await setDoc(productDoc, dataToUpdate, { merge: true });
      // console.log("Document updated successfully");
  } catch (err) {
      console.error(err);
  }
};

const productstotalprice = getTotalCartAmount();
const currentdateonly = getCurrentDate();

const submitcomment = async () => {
  const currentdate = getCurrentDateTime();

  // Get the current commentstorage object
  const productDoc = doc(db, "comments", "commentstorage");
  const productSnap = await getDoc(productDoc);
  const commentstorage = productSnap.data();

  // Calculate the new ID
  const newId = Object.keys(commentstorage).length + 1;

  const productDoc2 = doc(db, "comments", "commentstorage");
  const dataupdate2 = {
    ...commentstorage, // Keep existing data
    [newId]: {
      comment_username: auth?.currentUser?.displayName ? auth.currentUser.displayName : "Anonymous",
      comment: usercomment,
      photo: auth?.currentUser?.photoURL ? auth.currentUser.photoURL : null,
      time: currentdate,
      id: newId,
    },
  };

  await setDoc(productDoc2, dataupdate2, { merge: true });
  onchangecommentlist();
}

const product_total = async (currentdate) => {
  try {
    const documentPath = auth?.currentUser?.email ?  `${currentdate}_${auth.currentUser.email}` : `${currentdate}_${useremail}`;
    const productDoc = doc(db, "orders", documentPath);
      await updateDoc(productDoc, { total: productstotalprice, username: username , useremail: auth?.currentUser?.email ? auth.currentUser.email : useremail,useraddress: useraddress,userphone:userphone });
      localStorage.setItem('accesscomment', auth?.currentUser?.displayName ? `${auth.currentUser.displayName}` : `${username}`);
      // console.log(`type of authusername : ${typeof(auth.currentUser.displayName)}`);
      // console.log(`type of username : ${typeof(username)}`);
      // const dataupdate2 = {
      //   [currentdate]:{
      //     comment_username : auth?.currentUser?.displayName ? auth.currentUser.displayName : username,
      //     comment: usercomment,
      //     photo: auth?.currentUser?.photoURL? auth.currentUser.photoURL : null,
      //     time : currentdate,
      //   }
      // };
      // await setDoc(productDoc2,dataupdate2,{merge:true});
      // console.log('updated comment successfully')
      // onchangecommentlist();
  } catch (err) {
      console.log(err);
  }
};

const submitorder = async () => {
  setpayingstatus(true);
  // console.log('submit order');
  const currentdate = getCurrentDateTime();
  let checking = false;
  productlist.forEach((product) => {
    if (cartItems[product.id] !== 0) {
        checking=true;
    }
  });
  salelist.forEach((product2) => {
    if (cartItems[product2.id] !== 0) {
      checking = true;
    }
  });
  if(checking == false){
    alert('Your cart is empty!');
    return;
  }
  else{
    productlist.forEach((product) => {
      if (cartItems[product.id] > 0) {
          onsubmitproduct(product, currentdate);
      }
    });
    salelist.forEach((product2) => {
      if (cartItems[product2.id] > 0) {
          onsubmitproduct(product2, currentdate);
      }
    });
    await product_total(currentdate);
    setpaymentdone(true);
    setpayingstatus(false);
    clearAllCookies();
    getDefaultCart();
  }
};

useEffect(() => {
  let timer;
  if (paymentdone) {
    timer = setTimeout(() => {
      setpaymentdone(false);
    }, 5000);
  }
  return () => clearTimeout(timer);
}, [paymentdone]);

  const contextValue = {
    clearLocalStorage,
    usercomment,
    submitcomment,
    setcartposition,
    cartposition,
    speaktosale,
    setspeaktosale,
    changebackground,
    setchangebackground,
    totalproductnumber,
    payingstatus,
    salelist,
    userLoggedIn,
    productlist,
    loadingpage,
    cartItems,
    totalAmount,
    addToCart,
    removeFromCart,
    updateCartItemAmount,
    submitorder,
    paymentdone,
    useremail,
    useraddress,
    userphone,
    username,
    setusername,
    setuseraddress,
    setusercomment,
    setuseremail,
    setuserphone,
    commentlist,
  };

  return (
    <ShopContext.Provider value={contextValue}>
      {!loading && children}
    </ShopContext.Provider>
  );
};
