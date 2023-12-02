import { Alert, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { TextInput } from 'react-native-gesture-handler'
import axios from 'axios'

const adddetails = () => {
    const [employeeName, setEmployeeName] = useState("")
    const [employeeId, setEmployeeId] = useState("")
    const [dateOfBirth, setDateOfBirth] = useState("")
    const [designation, setDesignation] = useState("")
    const [phoneNumber, setPhoneNumber] = useState("")
    const [joiningDate, setJoiningDate] = useState("")
    const [salary, setSalary] = useState("")
    const [address, setAddress] = useState("")

    const handleRegister = () => {
        const employeeData = {
          employeeName: employeeName,
          employeeId: employeeId,
          dateOfBirth: dateOfBirth,
          designation: designation,
          phoneNumber: phoneNumber,
          activeEmployee: true,
          joiningDate: joiningDate,
          salary: salary,
          address: address,
        };
    
        // Log the payload for debugging
        console.log('Request Payload:', employeeData);
    
        const apiUrl = "http://localhost:80/addEmployee";
    
        axios.post(apiUrl, employeeData, {
          headers: {
            'Content-Type': 'application/json',
          },
        })
          .then((response) => {
            // Handle success
            Alert.alert("Registration successful", "You have been registered successfully");
            setEmployeeName("");
            setEmployeeId("");
            setDateOfBirth("");
            setDesignation("");
            setPhoneNumber("");
            setJoiningDate("");
            setSalary("");
            setAddress("");
          })
          .catch((error) => {
            // Handle error
            if (error.response) {
              // The request was made and the server responded with a status code
              console.error("Registration failed", error.response.data);
              Alert.alert("Registration failed", "An error occurred during registration");
            } else if (error.request) {
              // The request was made but no response was received
              console.error("No response received", error.request);
              Alert.alert("Registration failed", "No response received from the server");
            } else {
              // Something happened in setting up the request that triggered an Error
              console.error("Error setting up the request", error.message);
              Alert.alert("Registration failed", "Error setting up the request");
            }
          });
      };


    return (
        <ScrollView style={{ flex: 1, backgroundColor: "white" }}>
            <View style={{ padding: 10 }}>
                <Text style={{ fontSize: 17, fontWeight: "bold" }}>Add a New Employee</Text>
                <TextInput placeholder='India' placeholderTextColor={'black'} style={{ padding: 10, borderColor: "#D0D0D0", borderWidth: 1, marginTop: 10, borderRadius: 5 }} />
                <View style={{ marginVertical: 10 }}>
                    <Text style={{ fontSize: 17, fontWeight: "bold" }}>Full Name (First and last name)</Text>
                    <TextInput value={employeeName} onChangeText={(text) => setEmployeeName(text)} placeholder='Enter your name' placeholderTextColor={'black'} style={{ padding: 10, borderColor: "#D0D0D0", borderWidth: 1, marginTop: 10, borderRadius: 5 }} />
                </View>
                <View>
                    <Text style={{ fontSize: 17, fontWeight: "bold" }}>Employee Id</Text>
                    <TextInput value={employeeId} onChangeText={(text) => setEmployeeId(text)} placeholder='Employee Id' placeholderTextColor={'black'} style={{ padding: 10, borderColor: "#D0D0D0", borderWidth: 1, marginTop: 10, borderRadius: 5 }} />
                </View>
                <View style={{ marginVertical: 10 }}>
                    <Text style={{ fontSize: 17, fontWeight: "bold" }}>Designation</Text>
                    <TextInput value={designation} onChangeText={(text) => setDesignation(text)} placeholder='Designation' placeholderTextColor={'black'} style={{ padding: 10, borderColor: "#D0D0D0", borderWidth: 1, marginTop: 10, borderRadius: 5 }} />
                </View>
                <View>
                    <Text style={{ fontSize: 17, fontWeight: "bold" }}>Mobile Number</Text>
                    <TextInput value={phoneNumber} onChangeText={(text) => setPhoneNumber(text)} placeholder='Mobile Number' placeholderTextColor={'black'} style={{ padding: 10, borderColor: "#D0D0D0", borderWidth: 1, marginTop: 10, borderRadius: 5 }} />
                </View>
                <View style={{ marginVertical: 10 }}>
                    <Text style={{ fontSize: 17, fontWeight: "bold" }}>Date of Birth</Text>
                    <TextInput value={dateOfBirth} onChangeText={(text) => setDateOfBirth(text)} placeholder='Date of Birth' placeholderTextColor={'black'} style={{ padding: 10, borderColor: "#D0D0D0", borderWidth: 1, marginTop: 10, borderRadius: 5 }} />
                </View>
                <View>
                    <Text style={{ fontSize: 17, fontWeight: "bold" }}>Joining Date</Text>
                    <TextInput value={joiningDate} onChangeText={(text) => setJoiningDate(text)} placeholder='Joining Date' placeholderTextColor={'black'} style={{ padding: 10, borderColor: "#D0D0D0", borderWidth: 1, marginTop: 10, borderRadius: 5 }} />
                </View>
                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginTop: 10 }}>
                    <Text>Active Employee</Text>
                    <Text>True</Text>
                </View>
                <View style={{ marginVertical: 10 }}>
                    <Text style={{ fontSize: 17, fontWeight: "bold" }}>Salary</Text>
                    <TextInput value={salary} onChangeText={(text) => setSalary(text)} placeholder='Enter salary' placeholderTextColor={'black'} style={{ padding: 10, borderColor: "#D0D0D0", borderWidth: 1, marginTop: 10, borderRadius: 5 }} />
                </View>
                <View>
                    <Text style={{ fontSize: 17, fontWeight: "bold" }}>Address</Text>
                    <TextInput value={address} onChangeText={(text) => setAddress(text)} placeholder='Enter Address' placeholderTextColor={'black'} style={{ padding: 10, borderColor: "#D0D0D0", borderWidth: 1, marginTop: 10, borderRadius: 5 }} />
                </View>
                <Pressable onPress={handleRegister} style={{ backgroundColor: "#ABCABA", padding: 10, marginTop: 20, justifyContent: "center", alignItems: "center", borderRadius: 5 }}>
                    <Text style={{ fontWeight: "bold", color: "white" }}>Add Employee</Text>
                </Pressable>
            </View>
        </ScrollView>
    )
}

export default adddetails

const styles = StyleSheet.create({})