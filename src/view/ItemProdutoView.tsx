import { formatarPreco } from "@/utils/formatadorDePreco";
import { useItemProdutoViewModel } from "@/viewmodel/useItemProdutoViewModel";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import {
    ActivityIndicator,
    Image,
    ScrollView,
    Text,
    TouchableOpacity,
    View
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "./styles/itemProdutoStyle";

const ItemDetailScreen = () => {
    const router = useRouter();
    const vm = useItemProdutoViewModel();

    return (
        <View style={styles.tela}>
            {/* CABEÇALHO ROXO COM BOTÃO < VOLTAR */}
            <View style={styles.cabecalhoContainer}>
                <SafeAreaView edges={["top"]}>
                    <View style={styles.cabecalhoLinha}>
                        <TouchableOpacity
                            activeOpacity={0.7}
                            style={styles.botaoVoltar}
                            onPress={() => router.back()}
                        >
                            <Ionicons name="chevron-back" size={24} color="#ffffff" />
                            <Text style={styles.textoVoltar}>Voltar</Text>
                        </TouchableOpacity>

                        <Text style={styles.tituloHeader}>Detalhes do Lanche</Text>

                        <View style={styles.espacadorHeader} />
                    </View>
                </SafeAreaView>
            </View>

            {/* CONTEÚDO PRINCIPAL COM ROLAGEM */}
            {vm.carregando ? (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color="#501673" />
                    <Text style={styles.loadingTexto}>Carregando detalhes do item...</Text>
                </View>
            ) : vm.produto ? (
                <ScrollView
                    contentContainerStyle={styles.conteudoScroll}
                    showsVerticalScrollIndicator={false}
                >
                    {/* FOTO GRANDE DO PRODUTO */}
                    <View style={styles.cardFoto}>
                        <Image
                            source={vm.produto.imagemGrandeUrl}
                            style={styles.fotoGrande}
                            resizeMode="cover"
                        />
                        {/* Etiqueta Sobreposta no Canto Inferior da Foto */}
                        <View style={styles.overlayFoto}>
                            <Text style={styles.overlayTexto}>{vm.produto.nome}</Text>
                        </View>
                    </View>

                    {/* ÁREA DE DETALHES E INFORMAÇÕES */}
                    <View style={styles.infoSecao}>
                        {/* Título do Produto e Badge de Preço */}
                        <View style={styles.tituloPrecoLinha}>
                            <Text style={styles.nomeProduto}>{vm.produto.nome}</Text>
                            <View style={styles.badgePreco}>
                                <Text style={styles.textoBadgePreco}>
                                    {formatarPreco(vm.produto.preco)}
                                </Text>
                            </View>
                        </View>

                        {/* Tag da Categoria */}
                        <View style={styles.categoriaTag}>
                            <Text style={styles.textoCategoriaTag}>
                                {vm.produto.categoriaNome || "Lanche"}
                            </Text>
                        </View>

                        {/* Descrição do Produto */}
                        <Text style={styles.descricaoTexto}>{vm.produto.descricao}</Text>

                        {/* Informações Nutricionais */}
                        <View style={styles.nutricaoLinha}>
                            <Text style={styles.nutricaoItem}>
                                Proteínas:{" "}
                                <Text style={styles.nutricaoValor}>{vm.produto.proteinas}</Text>
                            </Text>
                            <Text style={styles.nutricaoItem}>
                                Carboidratos:{" "}
                                <Text style={styles.nutricaoValor}>{vm.produto.carboidratos}</Text>
                            </Text>
                            <Text style={styles.nutricaoItem}>
                                Gorduras:{" "}
                                <Text style={styles.nutricaoValor}>{vm.produto.gorduras}</Text>
                            </Text>
                        </View>

                        {/* Controle de Quantidade */}
                        <View style={styles.quantidadeLinha}>
                            <Text style={styles.quantidadeLabel}>Quantidades:</Text>

                            <View style={styles.seletorContainer}>
                                {/* Botão Menos (Roxo) */}
                                <TouchableOpacity
                                    activeOpacity={0.7}
                                    style={styles.btnMenos}
                                    onPress={vm.decrementarQuantidade}
                                >
                                    <Ionicons name="remove" size={20} color="#ffffff" />
                                </TouchableOpacity>

                                {/* Número da Quantidade */}
                                <Text style={styles.numeroQuantidade}>{vm.quantidade}</Text>

                                {/* Botão Mais (Verde) */}
                                <TouchableOpacity
                                    activeOpacity={0.7}
                                    style={styles.btnMais}
                                    onPress={vm.incrementarQuantidade}
                                >
                                    <Ionicons name="add" size={20} color="#ffffff" />
                                </TouchableOpacity>
                            </View>
                        </View>

                        {/* Botão Voltar ao Cardápio */}
                        <TouchableOpacity
                            activeOpacity={0.88}
                            style={styles.btnVoltarCardapio}
                            onPress={() => router.back()}
                        >
                            <Text style={styles.textoBtnVoltar}>Voltar ao Cardápio</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            ) : (
                <View style={styles.erroContainer}>
                    <Text style={styles.erroTexto}>Item não encontrado.</Text>
                </View>
            )}
        </View>
    );
}

export default ItemDetailScreen;