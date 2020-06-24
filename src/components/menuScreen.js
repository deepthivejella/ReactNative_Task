import { connect } from 'react-redux';
import actions from '../actions/actions';
import React, { useState, useEffect } from 'react';
import {View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Modal,
  StatusBar,
  TouchableWithoutFeedback,
} from 'react-native';
import { Card } from 'react-native-paper';
import helpers from '../helpers/helpers'

let SCREEN_HEIGHT = Dimensions.get('window').height;
let SCREEN_WIDTH = Dimensions.get('window').width;



const MenuScreen = (props)=>{ 
  const { items, addItemToCart, cartItems, setCartData, navigation } = props;
  const itemSections = Object.keys(items);
  const [modalVisible, setModalVisible] = useState(false);
  const [section, setSection] = useState(itemSections[0]);

  useEffect(() => {
    if(!cartItems.length)
    navigation.navigate('Menu')
  }, [cartItems.length])



  const removeAItem = (id) => {
    const newCartItems = helpers.removeCartItem(id, cartItems);

    setCartData(newCartItems);
  }
  
  return (
    <View style = {{flex:1}}>
        <StatusBar hidden = {false} backgroundColor = 'rgba(0,0,0,0.5)'/>
          <Image source = {require('../../assets/inkaImage.png')} style = {styles.imageStyles}/>
          <View style = {{flexDirection:'row',position:'absolute',top:6,right:10,margin:5,justifyContent:'space-evenly',width:'20%'}}>
            <Image source = {require('../../assets/upload.png')}style = {{height:20,width:20}}/>
            <Image  tintColor = "#ffffff"source = {require('../../assets/info.png')} style = {{height:20,width:20}}/>
          </View>
      <Card style = {styles.cardStyles}>
        <View style = {styles.cardContentStyles}>
            <Text style = {styles.text1}>Inka Restaurant</Text>
              <View style = {styles.textNodeParent}>
                  <View style = {styles.textView1}>
                    <Image source = {require('../../assets/star.png')} style = {styles.iconStyle}/>
                    <Text style = {styles.text2}>5.0(200+)</Text>
                  </View>
                  <Text style = {styles.text2}>All days : 09:00AM - 06:00PM </Text>
              </View>
              <View style ={styles.textView2}>
                <Image source = {require('../../assets/phone.png')} style = {styles.iconStyle}/>
                <Text style = {styles.text2}>Reach us at : 9854562142</Text>
              </View>
              <View style = {styles.textView3}>
                <Text style = {{color:'#ffffff'}}>BOOK A TABLE</Text>
              </View>
        </View>
      </Card>
      <View style = {{top:'15%'}}>
        <Text style = {{margin:10,fontSize:20}}>{section}</Text>
        {
          items[section].map((dishObj) => {
            const count = helpers.getSimilarDishesLength(dishObj.id, cartItems);
            return (
            <View key={dishObj.id} style = {{flexDirection:'row',alignItems:'center',marginHorizontal:10,borderBottomWidth:0.5,borderColor:'#d1e0e0'}}>
              <View>
                <Text style = {styles.itemText}>N</Text>
                <Text style = {{...styles.itemText,top:3}}>D</Text>
              </View>
              <View style = {{flexDirection:'column',padding:10}}>
                  <Text style ={{width:'100%',fontSize:15}}>{dishObj.name}</Text>
                  <Text style = {{width:'100%'}}>{dishObj.taste}</Text>
                  <Text style = {{color:'#ffbb99'}}>€{dishObj.price}</Text>
              </View>
              {
                count ? 
                (
                  <View style = {styles.quantityUpdatedView}>
                  <TouchableOpacity  style={styles.plusImageView} onPress={() => removeAItem(dishObj.id)}>
                    <Image source = {require('../../assets/minus.png')} style = {{height:10,width:10}}/>
                  </TouchableOpacity>

                  <Text style = {{alignItems:'center',justifyContent:'center',left:2}}>{count}</Text>

                  <TouchableOpacity  style={styles.minusImageView}  onPress={() => { count < 20 && addItemToCart(dishObj) }}>
                    <Image source = {require('../../assets/plus.png')} style = {{height: 10,width: 10,position: 'absolute',right: 10}} />
                  </TouchableOpacity>
                  </View>
                ) 
              : 
                (
                  <TouchableOpacity style = {styles.addButton} onPress={() => addItemToCart(dishObj)}>
                    <Text>Add</Text>
                  </TouchableOpacity>
                )
              }
              </View>)
          })
        }   
        </View>
        <TouchableOpacity onPress = {()=>setModalVisible(true)} style = {styles.menuView}>
          <Image source = {require('../../assets/menuIcon.png')} style = {{height:25,width:25}}/>
          <Text style = {styles.text2}>MENU</Text>
        </TouchableOpacity>
        <TouchableOpacity style = {styles.viewCart} onPress={() => { cartItems.length && navigation.navigate('Cart')}}>
          <Image tintColor = '#ffffff' source = {require('../../assets/cart.png')} style = {{height:25,width:25}}/>
          <Text style = {{...styles.viewCartText,paddingLeft:10}}>VIEW CART</Text>
          <Text style = {styles.viewCartText}>({cartItems.length} ITEMS) </Text>
        </TouchableOpacity>


        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
          }}
        >
          <TouchableOpacity
              activeOpacity={2}
              onPress={() => setModalVisible(!modalVisible)}
              style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', position: 'absolute', bottom: 0, top: 0, left: 0, right: 0,height:'100%'}}
            />
          <View style={styles.centeredView}>
            <View style={styles.modalView}>    
              {
                itemSections.map((section) => (
                <TouchableOpacity  key={section} style = {styles.modalTextView} onPress={() => setSection(section)}>
                  <Text style = {styles.modalText}>{section}</Text>
                  <Text style = {{...styles.modalText,color: '#ffbb99'}}>{items[section].length}</Text>
                </TouchableOpacity>)
                )
              }        
            </View>
          </View>
        </Modal>
    </View>
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

export default connect(mapStateToProps, mapDispatchToProps)(MenuScreen);

const styles = StyleSheet.create({
  imageStyles:{
  
      width: '100%',
      height: 200,
      resizeMode: 'cover'
  },
  iconStyle:{
    height:14,
    width:14,
  },
  cardStyles:{
    width: SCREEN_WIDTH-40,
    marginLeft:20,
    height:'20%',
    elevation:5,
    position:'absolute',
    top:'20%'
  },
  cardContentStyles:{
    padding:10,
    alignItems:'center'
  },
  text1:{
    fontWeight:'bold',
    fontSize:20
  },
  textNodeParent:{

    flexDirection:'row',
    padding:2,
    alignItems:'center',
    margin:5
  },
  textView1:{
    alignItems:'center',  
    borderRightWidth:0.5,
    height:16,width:'32%',
    flexDirection:'row'
  },
  text2:{
    paddingLeft:4,
    fontWeight:'200'
  },
  textView2:{
    flexDirection:'row',
    alignItems:'center',
    margin:5
  },
  textView3:{
    backgroundColor:'#001a33',
    margin:5,
    padding:5,
    borderRadius:5,
    width:'50%',
    alignItems:'center',
  },
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
  menuView:{
    position:'absolute',
    bottom:80 ,
    flexDirection:'row',
    width:'22%',
    backgroundColor:'#ffcc99',
    borderRadius:5,
    padding:2,
    alignItems:'center',
    justifyContent:'center',
    right:SCREEN_WIDTH/2.6
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
  addButton:{
   
    position:'absolute',
    right:10,
    alignItems: 'center',
    height:30,
    top:12,
    width:'24%',
    borderWidth: 0.5,
    borderColor: '#ffbb99',
    justifyContent:'center',
   
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  
  },
  modalView: {
    width:'80%',
    position:'absolute',
    bottom:50,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 25,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  modalTextView:{
    flexDirection:'row',
    justifyContent:'space-between',
    margin:5,
  },
  modalText: {
  fontSize:18
  },
  plusImageView:{
    height:40,
    width:40,
    alignItems:'center',
    justifyContent:'center'
  },
  minusImageView:{
    height:40,
    width:40,
    alignItems:'center',
    justifyContent:'center',
    position: 'absolute',
    right: 2
  },
  itemText:{
    borderWidth:1,
    borderColor:'grey',
    width:15,
    textAlign:'center'
  }
})