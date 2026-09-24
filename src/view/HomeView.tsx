import { useHomeViewModel } from "@/viewmodel/useHomeViewModel";
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
import { styles } from "./styles/homeStyle";

const HomeScreen = () => {
  const router = useRouter();
  const vm = useHomeViewModel();

  return (
    <View style={styles.tela}>
      {/* CABEÇALHO ROXO COM BORDAS ARREDONDADAS */}
      <View style={styles.cabecalhoContainer}>
        <SafeAreaView edges={["top"]}>
          <View style={styles.cabecalhoConteudo}>
            {/* Linha com Ícone do Gavião e Nome da Lanchonete */}
            <View style={styles.logoLinha}>
              <Image
                source={require("../../assets/images/menu/gaviao-logo.png")}
                style={styles.logoGaviao}
                resizeMode="contain"
              />
              <Text style={styles.tituloHeader}>IFPI Gavião</Text>
            </View>

            {/* Mensagem de Boas-Vindas */}
            <Text style={styles.subtituloTexto}>
              O que você deseja pedir hoje?
            </Text>
            <Text style={styles.subtituloDestaque}>Escolha uma categoria:</Text>
          </View>
        </SafeAreaView>
      </View>

      {/* ÁREA DE CONTEÚDO */}
      <ScrollView
        contentContainerStyle={styles.conteudoScroll}
        showsVerticalScrollIndicator={false}
      >
        {vm.carregando ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#501673" />
            <Text style={styles.loadingTexto}>Consultando cardápio...</Text>
          </View>
        ) : (
          <View style={styles.gridCategorias}>
            {vm.categorias.map((cat) => (
              <TouchableOpacity
                key={cat.id}
                activeOpacity={0.88}
                style={[styles.cardCategoria, { borderColor: cat.corBorda }]}
                onPress={() => router.push(`/category/${cat.id}` as any)}
              >
                {/* Imagem de Capa da Categoria */}
                <Image
                  source={cat.imagemUrl}
                  style={styles.imagemCategoria}
                  resizeMode="cover"
                />

                {/* Rodapé do Card com Nome e Seta */}
                <View style={styles.rodapeCard}>
                  <Text style={styles.nomeCategoria}>{cat.nome}</Text>
                  <Ionicons
                    name="arrow-forward"
                    size={20}
                    color={cat.corSeta}
                  />
                </View>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </ScrollView>
    </View>
  );
}

export default HomeScreen;