import { View, Text, StyleSheet, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native'
import { useQuery } from '@tanstack/react-query'
import { fetchUsers } from './api/api'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function HomeScreen() {
    const { data, isLoading, isError, error, isFetching, refetch } = useQuery({
        queryKey: ["users"],
        queryFn: fetchUsers
    })
    
    if (isLoading || isFetching) {
        return (
            <View style={styles.center}>
                <ActivityIndicator size='large' color="#fff" />
                <Text style={styles.loadingText}>Carregando usuários...</Text>
            </View>
        )
    }

    if (isError) {
        return (
            <View style={styles.center}>
                <Text style={styles.errorText}>Erro ao buscar os dados</Text>
                <Text style={styles.errorText}>{String(error?.message || '')}</Text>
            </View>
        )
    }

    return (
        <SafeAreaView style={styles.container}>
            <TouchableOpacity style={styles.button} onPress={refetch}>
                <Text style={styles.buttonText}>Atualizar Lista</Text>
            </TouchableOpacity>

            <FlatList
                data={data ?? []}
                keyExtractor={(item) => String(item.id)}
                refreshing={isFetching}
                onRefresh={refetch}
                contentContainerStyle={{ padding: 12 }}
                renderItem={({ item }) => (
                    <View style={styles.card}>
                        <Text style={styles.name}>{item.name}</Text>
                        <Text style={styles.email}>{item.email}</Text>
                        <Text style={styles.address}>
                            {item.address.street}, {item.address.suite} - {item.address.city}
                        </Text>
                    </View>
                )}
            />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#121212', // fundo preto
    },
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#121212'
    },
    loadingText: {
        color: '#fff',
        marginTop: 8,
        fontSize: 16
    },
    errorText: {
        color: '#ff4d4d',
        fontSize: 16,
        textAlign: 'center'
    },
    button: {
        backgroundColor: '#FF9800',
        paddingVertical: 12,
        paddingHorizontal: 16,
        margin: 12,
        borderRadius: 12,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOpacity: 0.3,
        shadowRadius: 6,
        shadowOffset: { width: 0, height: 3 },
        elevation: 5
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16
    },
    card: {
        backgroundColor: '#1E1E1E',
        padding: 16,
        borderRadius: 12,
        marginBottom: 12,
        shadowColor: '#000',
        shadowOpacity: 0.3,
        shadowRadius: 6,
        shadowOffset: { width: 0, height: 3 },
        elevation: 5
    },
    name: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 4
    },
    email: {
        color: '#bbb',
        fontSize: 14,
        marginBottom: 4
    },
    address: {
        color: '#888',
        fontSize: 13
    }
})
