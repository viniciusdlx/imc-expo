import { React, useState, useEffect } from 'react'
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    SafeAreaView,
    TextInput
} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'

export default function App() {
    const [peso, setPeso] = useState(1)
    const [altura, setAltura] = useState(1)
    const [imc, setImc] = useState(0)
    const [result, setResult] = useState('')
    const [lastImc, setLastImc] = useState(0)
    const [lastPeso, setLastPeso] = useState(0)
    const [lastAltura, setLastAltura] = useState(0)

    const handleCalculateIMC = () => {
        const imc = peso / (altura * altura)
        AsyncStorage.setItem('@LastImc', String(imc))
        AsyncStorage.setItem('@LastPeso', String(peso))
        AsyncStorage.setItem('@LastAltura', String(altura))

        // console.log('imc -> ', imc)

        if (imc >= 40) {
            setResult('OBESIDADE GRAU III (Mórbida)')
        }
        if (imc >= 35) {
            setResult('OBESIDADE GRAU II (Severa)')
        }
        if (imc >= 30 && imc < 35) {
            setResult('OBESIDADE GRAU I')
        }
        if (imc >= 25 && imc < 30) {
            setResult('SAUDÁVEL')
        }
        if (imc >= 18.5 && imc < 25) {
            setResult('MAGREZA LEVE')
        }
        if (imc >= 17 && imc < 18.5) {
            setResult('MAGREZA MODERADA')
        }
        if (imc >= 16 && imc < 17) {
            setResult('MAGREZA GRAVE')
        }

        setImc(imc)
    }

    const returnLastUsedValues = async () => {
        try {
            // Pega o item do Ultimo IMC calculado
            const valueLastImc = await AsyncStorage.getItem('@LastImc')
            const valueLastPeso = await AsyncStorage.getItem('@LastPeso')
            const valueLastAltura = await AsyncStorage.getItem('@LastAltura')
            if (
                valueLastImc !== null &&
                valueLastPeso !== null &&
                valueLastAltura !== null
            ) {
                setLastImc(valueLastImc)
                setLastPeso(valueLastPeso)
                setLastAltura(valueLastAltura)
            }
        } catch (e) {
            // error reading value
        }
    }

    useEffect(() => {
        // retorna IMC salvo
        returnLastUsedValues()
    }, [])

    return (
        <View style={styles.container}>
            <Text style={{ marginBottom: 40, fontSize: 18 }}>
                Artur Salvador Tiscoski & Vinicius de Lima Xavier
            </Text>
            <SafeAreaView style={{ width: '80%' }}>
                <TextInput
                    style={styles.input}
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
                style={styles.calcImcButton}
            >
                <Text style={{ fontSize: 16, color: '#000' }}>
                    CALCULAR IMC
                </Text>
            </TouchableOpacity>

            <Text style={{ fontSize: 20 }}>
                O seu IMC é: {parseFloat(imc).toFixed(2)}
            </Text>
            <Text style={styles.text}>Você tem ou é: {result}</Text>

            <Text style={styles.text2}>
                Ultimo IMC calculado: {parseFloat(lastImc).toFixed(2)}
            </Text>
            <Text style={styles.text2}>Peso anterior: {lastPeso}</Text>
            <Text style={styles.text2}>Altura anterior: {lastAltura}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    },
    calcImcButton: {
        backgroundColor: '#FEB6C4',
        width: '80%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 4,
        marginBottom: 16,
        borderRadius: 4
    },
    input: {
        height: 50,
        marginBottom: 16,
        borderWidth: 1,
        padding: 10,
        borderColor: '#FEB6C4',
        borderRadius: 4
    },
    text: {
        fontSize: 20,
        marginBottom: 14
    },
    text2: {
        fontSize: 18
    }
})
