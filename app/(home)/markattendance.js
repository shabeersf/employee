import { View, Text, Pressable, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import moment from "moment"
import axios from 'axios'
import { AntDesign } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const markattendance = () => {
  const router = useRouter()
  const [currentDate, setCurrentDate] = useState(moment())
  const gotoNextDay = () => {
    const nextDate = moment(currentDate).add(1, "days")
    setCurrentDate(nextDate)
  }
  const gotoPreviousDay = () => {
    const previousDate = moment(currentDate).subtract(1, "days")
    setCurrentDate(previousDate)
  }

  const formatDate = (date) => {
    return date.format("MMMM D,YYYY");
  }

  const [employees, setEmployees] = useState([])

  useEffect(() => {
    const fetchEmployeeData = async () => {
      try {
        const response = await axios.get("http://localhost:80/employees");
        setEmployees(response.data);
      } catch (error) {
        console.log("error fetching employee data", error);
      }
    }
    fetchEmployeeData();
  }, []);

  const [attendance, setAttendance] = useState([])

  const employeewithAttendance = employees.map((employee) => {
    const attendaceRecord = attendance.find((record) => record.employeeId === employee.employeeId)

    return {
      ...employee, status: attendaceRecord ? attendaceRecord.status : ""
    }
  })


  const fetchAttendanceData = async () => {
    try {
      const response = await axios.get("http://localhost:80/attendance", {
        params: {
          date: currentDate.format("MMMM D,YYYY")
        },
      });
      setAttendance(response.data);
    } catch (error) {
      console.log("error fetching attendance data", error);
    }
  }
  useEffect(() => {
    fetchAttendanceData();
  }, [currentDate])

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <Pressable>
        <View style={{ flexDirection: "row", gap: 10, marginLeft: "auto", marginRight: "auto" }}>
          <AntDesign onPress={gotoPreviousDay} name="left" size={24} color="black" />
          <Text>{formatDate(currentDate)}</Text>
          <AntDesign onPress={gotoNextDay} name="right" size={24} color="black" />
        </View>
        <ScrollView style={{ marginHorizontal: 12 }}>
          {

            employeewithAttendance.map((item, index) => {

              return (
                <Pressable onPress={() => router.push({
                  pathname: "/[user]",
                  params: {
                    name: item.employeeName,
                    id: item.employeeId,
                    salary: item?.salary,
                    designation: item?.designation,
                  }
                })} key={index} style={{ alignItems: "center", gap: 10, flexDirection: "row" }}>
                  <View style={{ padding: 10 }}>

                    <View style={{ marginVertical: 10, gap: 10, flexDirection: "row" }}>
                      <View style={{ width: 50, height: 50, borderRadius: 8, padding: 10, backgroundColor: "#4B6CB7", alignItems: "center", justifyContent: "center" }}>
                        <Text style={{ fontSize: 16, color: "white" }}>{item?.employeeName?.charAt(0)}</Text>
                      </View>
                      <View>
                        <Text style={{ fontSize: 16, fontWeight: "bold" }}>{item?.employeeName}</Text>
                        <Text style={{ marginTop: 5, color: "gray" }}>{item?.designation} ({item?.employeeId}) </Text>
                      </View>
                      {
                        item?.status && (
                          <View style={{ width: 50, height: 50, borderRadius: 8, padding: 10, backgroundColor: "#FF69B4", alignItems: "center", justifyContent: "center" }}>
                            <Text style={{ fontSize: 16, color: "white" }}>{item?.status?.charAt(0)}</Text>
                          </View>
                        )
                      }
                    </View>



                  </View>
                </Pressable>
              )
            })
          }
        </ScrollView>
      </Pressable>
    </View>
  )
}

export default markattendance