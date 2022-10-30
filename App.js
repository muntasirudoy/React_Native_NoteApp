import { StatusBar } from 'expo-status-bar';
import { StyleSheet,
  SafeAreaView,
  FlatList,
  ScrollView,
  TextInput,
  Text,
  View,
  TouchableOpacity,
  Image,
  Button
} from 'react-native';
import React, { useState, useEffect } from 'react';
import backimg from "./assets/back.png"




const defaultValue = {
  title: '',
  text: '',
}

export default function App() {



  const [user, setUser] = useState(defaultValue);
  const [modal, setModal] = useState(false)
  const [notemodal, setNoteModal] = useState(false)

  const [loading, setLoading] = useState(false);

  const [notes, setNotes] = useState([])
  const [indNote, setIndNote] = useState('')
  const onChangeTitle = (value) => {
    setUser({ ...user, title: value });
  };

  const onChangeNotes = (value) => {
    setUser({ ...user, notes: value });
  };

const saveData =()=>{
   let list = []
   list.push(...notes,user)
   setNotes(list)
   setModal(!modal)
}


const showNotess =(id)=>{

 let newItem = notes.find((e,index)=>  {
  if(index == id){
    return e
  }
 })
 setIndNote(newItem)
setNoteModal(!notemodal)
}
const closeModal =()=>{
  setNoteModal(!notemodal)
}

const deleteNote=(id)=>{
  let newItem = notes.filter((e,index)=> index != id )
   setNotes(newItem)
}

  const clickHandler = () => {
     setModal(!modal)
  };
  return (
    <SafeAreaView style={styles.container}>
  <Text style={styles.heading}>All Notes</Text>

        <ScrollView>
           {notes && notes.map((e,index)=>(
              <View key={index} style={styles.item} >
                 <View>
                 <Text onPress={()=>showNotess(index)} style={styles.title}>{e.title}</Text>
                 <Text style={styles.notes}>{e.notes}</Text>
                 </View>
                 <TouchableOpacity  onPress={()=>deleteNote(index)}>
                      <Text> Delete</Text>
                  </TouchableOpacity>
              </View>
           ))}
          </ScrollView>



      <View style={styles.container}>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={clickHandler}
          style={styles.touchableOpacityStyle}>
          <Image
            source={{
              uri:
                'https://raw.githubusercontent.com/AboutReact/sampleresource/master/plus_icon.png',
            }}
            //You can use you project image Example below
            //source={require('./images/float-add-icon.png')}
            style={styles.floatingButtonStyle}
          />
        </TouchableOpacity>
      </View>
      {modal &&  
         <>
         <View  style={styles.modal}>
         <TextInput
            placeholder={'Title'}
            onChangeText={(value) => onChangeTitle(value)}
            style={styles.input}
            />

            <TextInput
            placeholder={'Note'}
            onChangeText={(value) => onChangeNotes(value)}
            style={styles.input}
            />
          <TouchableOpacity onPress={saveData}>
            <View style={{ backgroundColor: 'blue', padding: 10,marginTop:25 }}>
              <Text style={{ color: 'white', textAlign: 'center' }}>
                Add note
              </Text>
            </View>
         </TouchableOpacity>
         </View>
         </>
          
          }

       {notemodal &&  
         <>
         <View  style={styles.modalNote} >
            <View>
               <Text style={{fontSize:20,marginBottom:20}}>Title: {indNote.title}</Text>
               <Text>Notes: {indNote.notes}</Text>
            </View>

            <TouchableOpacity  onPress={closeModal}>
             <Text> Close</Text>
         </TouchableOpacity>
           

         </View>
         </>
          
          }

    </SafeAreaView>
  );
}




const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
    position:"relative"
  },
  item: {
    backgroundColor: 'oldlace',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    flex:2,
    flexDirection:"row",
    justifyContent:"space-between",
  borderRadius: 15
    

  },
  title: {
    fontSize: 18,
    color: "efefef",
    fontWeight: '700',
    letterSpacing:1,
    paddingLeft:10
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 10,
    cursor:'pointer',

  },
  titleStyle: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 10,
    cursor:'pointer',

  },
  textStyle: {
    fontSize: 16,
    textAlign: 'center',
    padding: 10,
  },
  touchableOpacityStyle: {
    position: 'absolute',
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    right: 30,
    bottom: 30,
    
    
  },
  floatingButtonStyle: {
    resizeMode: 'contain',
    width: 50,
    height: 50,
    cursor:'pointer',
    marginBottom:100
  },
  heading:{
   fontSize:32,
   textAlign: "center",
   padding: 50,
   fontWeight:'bold'
  },
  subtitle:{
paddingLeft: 20
  },
  modal:{
    position: 'absolute', 
    top:'40%',
    left:15,
    width:'98%',
    padding:30,
    backgroundColor:"rgba(0,0,0, 0.1)"
  },

  modalNote:{
    position: 'absolute', 
    top:'15%',
    zIndex:111,
    left:15,
    width:'98%',
    padding:30,
    height:800,
    backgroundColor: "white",
    flex:2,
    flexDirection:"row",
    justifyContent:"space-between"

  },

  modalHead:{
    fontSize:18,
    marginBottom:20

  },

  modalCreateButtont:{
    marginTop:50
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginVertical: 5,
  },

  title:{
    fontSize:20,
  }
});
