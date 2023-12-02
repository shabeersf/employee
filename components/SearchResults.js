import { View, Text, FlatList } from 'react-native'
import React from 'react'

const SearchResults = ({ data, input, setInput }) => {

    return (
        <View style={{ padding: 10 }}>
            <FlatList data={data} renderItem={(item) => {
               if (item?.item?.employeeName && item.item.employeeName.toLowerCase().includes(input.toLowerCase())) {
                    return (
                        <View style={{ marginVertical: 10, gap: 10, flexDirection: "row" }}>
                            <View style={{ width: 50, height: 50, borderRadius: 8, padding: 10, backgroundColor: "#4B6CB7", alignItems: "center", justifyContent: "center" }}>
                                <Text  style={{fontSize:16,color:"white"}}>{item?.item?.employeeName?.charAt(0)}</Text>
                            </View>
                            <View>
                                <Text style={{fontSize:16,fontWeight:"bold"}}>{item?.item?.employeeName}</Text>
                                <Text  style={{marginTop:5,color:"gray"}}>{item?.item?.designation} ({item?.item?.employeeId}) </Text>
                            </View>
                        </View>
                    )
                }
            }} />
        </View>
    )
}

export default SearchResults