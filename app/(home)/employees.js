import { Pressable, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { TextInput } from 'react-native-gesture-handler';
import { useRouter } from 'expo-router';
import SearchResults from '../../components/SearchResults';

const Employees = () => {
    const [employees, setEmployees] = useState([]);
    const [input, setInput] = useState('');

  const handleInputChange = (text) => {
    setInput(text);
  };

    const router = useRouter()

    useEffect(() => {
        const fetchEmployeeData = async () => {
            try {
                const response = await axios.get("http://localhost:80/employees"); // Corrected endpoint
                setEmployees(response.data);
            } catch (error) {
                console.log("error fetching employee data", error);
            }
        }
        fetchEmployeeData();
    }, []);

    

    return (
        <View style={{ flex: 1, backgroundColor: "white", }}>
            <View style={{ flexDirection: "row", alignItems: "center", backgroundColor: "white" }}>
                <Ionicons style={{ marginLeft: 10 }} name="arrow-back" size={24} color="black" />
                <Pressable style={{ flexDirection: "row", alignItems: "center", marginHorizontal: 7, gap: 10, height: 40, backgroundColor: "white", borderRadius: 4, flex: 1 }}>
                    <AntDesign name="search1" size={20} color="black" />
                    <TextInput value={input} onChangeText={handleInputChange} style={{ flex: 1 }} placeholder='Search' />
                    {
                        employees.length > 0 && (
                            <View>
                                <Pressable onPress={() => router.push('/(home)/adddetails')}>
                                    <AntDesign name="pluscircle" size={24} color="black" />
                                </Pressable>
                            </View>
                        )
                    }
                </Pressable>
            </View>
            {
                employees.length > 0 ? (
                    <SearchResults data={employees} input={input} setInput={setInput} />
                ) : (
                    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                        <Text>No Data</Text>
                        <Text>Press on the plus button and add your Employee</Text>
                        <Pressable onPress={() => router.push('/(home)/adddetails')}>
                            <AntDesign style={{ marginTop: 30, }} name="pluscircle" size={24} color="#0072B1" />
                        </Pressable>
                    </View>
                )
            }
        </View>
    );
}

export default Employees;

const styles = StyleSheet.create({});
