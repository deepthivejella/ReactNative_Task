import React,{useState} from 'react';
import {View,Text,Image,Dimensions,TouchableOpacity,StyleSheet,ScrollView}from 'react-native';
import { connect } from 'react-redux';
import actions from '../actions/actions';
import {RadioButton}from 'react-native-paper';
import helpers from '../helpers/helpers';

const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;

const Cart = (props)=>{
  const[deliveryOptions,setDeliveryOptions]=useState('Dine-in');
  const [itemsViewLimit, setItemsViewLimit] = useState(2);
  const { cartItems, addItemToCart, setCartData } = props;
  const totalCost = cartItems.map((itemObj) => itemObj.price).reduce(((acc, currentValue) => acc + currentValue),0);
  const idsList = cartItems.map((itemObj) => itemObj.id);
  const idsSet = [...new Set(idsList)].sort();
  const limitedIdsSet = idsSet.slice(0, itemsViewLimit);
  const [changeView,setChangeView]=useState(false);
  const removeAItem = (id) => {
    const newCartItems = helpers.removeCartItem(id, cartItems);

    setCartData(newCartItems);
  }

  const renderView = () => {

    if (idsSet.length < 2 || idsSet.length === limitedIdsSet.length ) return;

    return  (<Text style = {{textDecorationLine:'underline',position:'absolute',right:10,top:'58%'}} onPress={() => {setItemsViewLimit(idsSet.length),setChangeView(true)}}>
      Show More
    </Text>)
  }

    return (
      <>
        <View style = {{backgroundColor:'#001a33',height:"25%"}}/>
        <View style = {styles.totalCostView}>
            <Text style ={{textAlign:'center',color:'#FCBC98',fontSize:14}}>Total Cost</Text>
            <Text  style ={{textAlign:'center',fontSize:18}}>€{`${totalCost}`}</Text>
        </View>
        <Text style = {{margin:10,fontSize:16}}>Review Orders</Text>
        <View style = {{flex:1,marginBottom:25}}>
            <ScrollView>
            {
              limitedIdsSet.map((id) => {
                const dishObjsList = cartItems.filter((dishObj) => dishObj.id === id);
                const dishObjLength = dishObjsList.length;
                const dishObj = dishObjsList[0];

                return(
              
              
                <View key={id} style = {{flexDirection:'row',alignItems:'center',marginHorizontal:10,borderBottomWidth:0.5,borderColor:'#d1e0e0'}}>
                <View>
                  <Text style = {styles.itemText}>N</Text>
                  <Text style = {{...styles.itemText,top:3}}>D</Text>
                </View>
                <View style = {{flexDirection:'column',padding:10}}>
                  <Text style ={{width:'100%',fontSize:15}}>{dishObj.name}</Text>
                  <Text style = {{width:'100%',fontSize:14}}>{dishObj.taste}</Text>
                  <Text style = {{color:'#FCBC98',fontSize:18,top:2}}>€</Text>
                </View>
                  
                <View style = {styles.quantityUpdatedView}>
                  <TouchableOpacity  style={{height:40,width:40,alignItems:'center',justifyContent:'center'}} onPress={() => removeAItem(id)}>
                    <Image source = {require('../../assets/minus.png')} style = {{height:10,width:10}}/>
                  </TouchableOpacity>
                  
                  <Text style = {{alignItems:'center',justifyContent:'center',left:2}}>{dishObjLength}</Text>
                  
                  <TouchableOpacity  style={{height:40,width:40,alignItems:'center',justifyContent:'center',position: 'absolute',right: 2}}
                    onPress={() => { dishObjLength < 20 && addItemToCart(dishObj)}}
                  >
                    <Image source = {require('../../assets/plus.png')} style = {{height: 10,width: 10,position: 'absolute',right: 10}}/>
                  </TouchableOpacity>
                </View> 
      
                <Image source = {require('../../assets/chat.png')} style = {{height:20,width:20,position:'absolute',right:10,bottom:9}}/>
              
              </View>
        
                )
              } 
              )
            }
            </ScrollView>
        </View>
        {
          renderView()
        }
        <View style = {{bottom:changeView ? 30 : '24%',margin:15}}>
          <Text style ={{fontSize:16}}>Delivery Options</Text>
            <View style = {{flexDirection:'row',margin:14,justifyContent:'space-evenly'}}>
                  <View style = {{flexDirection: 'row',right: 2,alignItems:'center'}}>
                    <Image source = {require('../../assets/dining.png')} style = {{height:20,width:20}}/>
                    <Text style = {{padding:8}}>Dine-in</Text>
                    <RadioButton
                          value="Dine-in"
                          color="#FCBC98"

                          status={deliveryOptions === 'Dine-in' ? 'checked' : 'unchecked'}
                          onPress={() => setDeliveryOptions('Dine-in')}
                          
                    />

                  </View>
                  <View style = {{flexDirection: 'row',right: 2,alignItems:'center',paddingLeft:10}}>
                    <Image source ={require('../../assets/delivery.png')} style = {{height:20,width:20}}/>
                    <Text style =  {{padding:8}}>Take way</Text>
                      <RadioButton
                          value="Take way"
                          color="#FCBC98"
                          status={deliveryOptions === 'Take way' ? 'checked' : 'unchecked'}
                          onPress={() => setDeliveryOptions('Take way')}
                      />
                      
                  </View>
               </View>
             </View>
          <TouchableOpacity style = {styles.viewCart}>
            <Text style = {{...styles.viewCartText,paddingLeft:10}}>PLACE ORDER</Text>
          </TouchableOpacity>
        </>
    )
}

const mapStateToProps = state => {
  return { 
      items: state.menuReducer,
      cartItems: state.cartReducer.cart
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addItemToCart: (dish) => dispatch(actions.addItemToCart(dish)),
    setCartData: (data) => dispatch(actions.setCartData(data))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart);

const styles = StyleSheet.create({
  viewCart:{
      position:'absolute',
      bottom:0,
      backgroundColor:'#001a33',
      height:60,
      width:'100%',
      alignItems:'center',
      justifyContent:'center',
      flexDirection:'row',
      
    },
    viewCartText:{
      color:'#ffffff',
      fontSize:17
    },
    quantityUpdatedView:
    {
        flexDirection: 'row',
        position:'absolute',
        right:10,
        alignItems: 'center',
        height:30,
        top:12,
        width:'24%',
        borderWidth: 0.5,
        borderColor: '#ffbb99',
        shadowColor: '#FFF',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.4,
        shadowRadius: 1,
    },
    itemText:{
      borderWidth:1,
      borderColor:'grey',
      width:15,
      textAlign:'center'
    },
    
    totalCostView:{
      padding:10,
      width:'40%',
      borderRadius:5,
      backgroundColor:'#ffffff',
      position:'absolute',
      top:50,
      justifyContent:'center',
      alignSelf:'center',
      right:SCREEN_WIDTH/3.5
    }
})