import { View, Text, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import moment from 'moment'
import axios from 'axios'
import { AntDesign } from '@expo/vector-icons';
import { DataTable } from 'react-native-paper';

const summary = () => {
    const [attendanceData, setAttendanceData] = useState([])
    const [currentDate, setCurrentDate] = useState(moment())

    const gotoNextMonth = () => {
        const nextMonth = moment(currentDate).add(1, "months")
        setCurrentDate(nextMonth)
    }

    const gotoPreviousMonth = () => {
        const previousMonth = moment(currentDate).subtract(1, "months")
        setCurrentDate(previousMonth)
    }

    const formatDate = (date) => {
        return date.format('MMMM, YYYY')
    }

    const fetchAttendanceReport = async () => {
        try {
            const response = await axios.get(`http://localhost:80/attendance-report-all-employees`, {
                params: {
                    month: 11,
                    year: 2023
                },
            });
            setAttendanceData(response.data.report);
        } catch (error) {
            console.log("error fetching attendance data", error);
        }
    }
    useEffect(() => {
        fetchAttendanceReport();
    }, [])
    return (
        <ScrollView style={{ flex: 1, backgroundColor: "white" }}>
            <View style={{ flexDirection: "row", gap: 10, marginLeft: "auto", marginRight: "auto" }}>
                <AntDesign onPress={gotoPreviousMonth} name="left" size={24} color="black" />
                <Text>{formatDate(currentDate)}</Text>
                <AntDesign onPress={gotoNextMonth} name="right" size={24} color="black" />
            </View>
            <View style={{ marginHorizontal: 12 }}>
                {
                    attendanceData?.map((item, index) => (
                        <View key={index} style={{ marginVertical: 10 }}>
                            <View style={{ marginVertical: 10, gap: 10, flexDirection: "row", alignItems: "center" }}>
                                <View style={{ width: 50, height: 50, borderRadius: 8, padding: 10, backgroundColor: "#4B6CB7", alignItems: "center", justifyContent: "center" }}>
                                    <Text style={{ fontSize: 16, color: "white" }}>{item?.name?.charAt(0)}</Text>
                                </View>
                                <View>
                                    <Text style={{ fontSize: 16, fontWeight: "bold" }}>{item?.name}</Text>
                                    <Text style={{ marginTop: 5, color: "gray" }}>{item?.designation} ({item?.employeeId}) </Text>
                                </View>
                            </View>
                            <View style={{marginTop:15,margin:5,padding:5,backgroundColor:"#A1FFCE",borderRadius:5}}>
                                <DataTable>
                                    <DataTable.Header>
                                        <DataTable.Title>P</DataTable.Title>
                                        <DataTable.Title>A</DataTable.Title>
                                        <DataTable.Title>HA</DataTable.Title>
                                        <DataTable.Title>HO</DataTable.Title>
                                        <DataTable.Title>NW</DataTable.Title>
                                    </DataTable.Header>
                                    <DataTable.Row>
                                        <DataTable.Cell >{item?.present}</DataTable.Cell>
                                        <DataTable.Cell >{item?.absent}</DataTable.Cell>
                                        <DataTable.Cell >{item?.halfday}</DataTable.Cell>
                                        <DataTable.Cell >1</DataTable.Cell>
                                        <DataTable.Cell >{item?.present}</DataTable.Cell>
                                    </DataTable.Row>
                                </DataTable>
                            </View>
                        </View>
                    ))
                }
            </View>
        </ScrollView>
    )
}

export default summary