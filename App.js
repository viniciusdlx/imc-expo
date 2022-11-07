import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TouchableOpacity, View, SafeAreaView, TextInput  } from 'react-native';

export default function App() {
  const [peso, setPeso] = React.useState("");
  const [altura, setAltura] = React.useState("");
  const [result, setResult] = React.useState(0);
  const [imc, setImc] = React.useState();

  function handleCalculateIMC(){
    // alert('Hello World!')
    alert(altura)
  }

  return (
    
    <View style={styles.container}>
      <SafeAreaView style={{width: '80%'}}>
        <TextInput style={styles.input} 
        value={peso} 
        placeholder="Informe o peso" 
        keyboardType="numeric"
        onChangeText={text => setPeso(text)}
        />

        <TextInput
          style={styles.input}
          value={altura}
          placeholder="Informe a altura"
          keyboardType="numeric"
          onChangeText={text => setAltura(text)}
        />
      </SafeAreaView>
      <TouchableOpacity
        onPress={handleCalculateIMC}
        style={styles.calcImcButton}>
        <Text style={{ fontSize: 16, color: '#000' }}>CALCULAR IMC</Text>
      </TouchableOpacity>

      <Text>O seu IMC é: {parseFloat(result).toFixed(3)}</Text>
      <Text> voce tem: {imc}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  calcImcButton: {
    backgroundColor: '#FEB6C4', 
    width: '80%', 
    alignItems: 'center', 
    padding: 4, 
    margin: '8px 0px', 
    borderRadius: 4
  },
  input: {
    height: 40,
    margin: '8px 0px',
    borderWidth: 1,
    padding: 10,
  },
});
