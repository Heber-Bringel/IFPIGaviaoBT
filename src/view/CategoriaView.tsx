import { formatarPreco } from "@/utils/formatadorDePreco";
import { useCategoriaViewModel } from "@/viewmodel/useCategoriaViewModel";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import {
    ActivityIndicator,
    FlatList,
    Image,
    Text,
    TouchableOpacity,
    View
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "./styles/categoriaStyle";

const CategoriaScreen = () => {
    const router = useRouter();
    const vm = useCategoriaViewModel();

    return (
        <View style={styles.tela}>
            {/* CABEÇALHO ROXO DA CATEGORIA */}
            <View style={styles.cabecalhoContainer}>
                <SafeAreaView edges={["top"]}>
                    <View style={styles.cabecalhoLinha}>
                        {/* Botão de Retorno < Início */}
                        <TouchableOpacity
                            activeOpacity={0.7}
                            style={styles.botaoVoltar}
                            onPress={() => router.back()}
                        >
                            <Ionicons name="chevron-back" size={24} color="#ffffff" />
                            <Text style={styles.textoVoltar}>Início</Text>
                        </TouchableOpacity>

                        {/* Nome Centralizado da Categoria */}
                        <Text style={styles.tituloHeader}>{vm.nomeCategoria}</Text>

                        {/* Espaçador invisível para balancear o cabeçalho */}
                        <View style={styles.espacadorHeader} />
                    </View>
                </SafeAreaView>
            </View>

            {/* CONTEÚDO PRINCIPAL: LISTA DE PRODUTOS */}
            {vm.carregando ? (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color="#501673" />
                    <Text style={styles.loadingTexto}>Buscando itens no banco...</Text>
                </View>
            ) : (
                <FlatList
                    data={vm.produtos}
                    keyExtractor={(item) => item.id}
                    contentContainerStyle={styles.listaConteudo}
                    showsVerticalScrollIndicator={false}
                    ListEmptyComponent={
                        <View style={styles.vazioContainer}>
                            <Text style={styles.vazioTexto}>
                                Nenhum item encontrado nesta categoria.
                            </Text>
                        </View>
                    }
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            activeOpacity={0.85}
                            style={styles.cardItem}
                            onPress={() => router.push(`/item/${item.id}` as any)}
                        >
                            {/* Miniatura do Produto */}
                            <Image
                                source={item.imagemPequenaUrl}
                                style={styles.thumbnail}
                                resizeMode="cover"
                            />

                            {/* Informações Centrais: Nome e Preço */}
                            <View style={styles.infoContainer}>
                                <Text style={styles.nomeItem}>{item.nome}</Text>
                                <Text style={styles.precoItem}>
                                    {formatarPreco(item.preco)}
                                </Text>
                            </View>

                            {/* Seta Indicativa à Direita */}
                            <Ionicons name="chevron-forward" size={22} color="#b0b5be" />
                        </TouchableOpacity>
                    )}
                />
            )}
        </View>
    );
}

export default CategoriaScreen;