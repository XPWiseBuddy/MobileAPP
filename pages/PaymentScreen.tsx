import React from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  TouchableOpacity, 
  ScrollView, 
  Alert 
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { colors, spacing, fontSizes } from '../theme';

export default function PaymentScreen({ navigation, route }: any) {
  const { selectedPlan } = route.params || {};

  const paymentMethods = [
    {
      id: 'credit_card',
      title: 'Cartão de Crédito',
      subtitle: 'Visa, Mastercard, Elo',
      icon: 'credit-card'
    },
    {
      id: 'debit_card',
      title: 'Cartão de Débito',
      subtitle: 'Pagamento à vista',
      icon: 'payment'
    },
    {
      id: 'pix',
      title: 'PIX',
      subtitle: 'Pagamento instantâneo',
      icon: 'qr-code'
    },
    {
      id: 'boleto',
      title: 'Boleto Bancário',
      subtitle: 'Vencimento em 3 dias',
      icon: 'receipt'
    }
  ];

  const handlePaymentMethod = (methodId: string) => {
    Alert.alert(
      'Funcionalidade em Desenvolvimento',
      `Método de pagamento "${paymentMethods.find(m => m.id === methodId)?.title}" será implementado em breve.`,
      [{ text: 'OK', style: 'default' }]
    );
  };

  const handleBackToSubscription = () => {
    navigation.goBack();
  };

  const handleBackToHome = () => {
    navigation.navigate('Main', { screen: 'Home' });
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={handleBackToSubscription}
        >
          <Icon name="arrow-back" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Pagamento</Text>
      </View>

      {selectedPlan && (
        <View style={styles.selectedPlanContainer}>
          <Text style={styles.selectedPlanTitle}>Plano Selecionado</Text>
          <View style={styles.planSummary}>
            <Text style={styles.planName}>{selectedPlan.title}</Text>
            <Text style={styles.planPrice}>{selectedPlan.price}{selectedPlan.period}</Text>
            {selectedPlan.discount && (
              <Text style={styles.planDiscount}>{selectedPlan.discount}</Text>
            )}
          </View>
        </View>
      )}

      <View style={styles.paymentMethodsContainer}>
        <Text style={styles.sectionTitle}>Escolha a forma de pagamento</Text>
        
        {paymentMethods.map((method) => (
          <TouchableOpacity
            key={method.id}
            style={styles.paymentMethodCard}
            onPress={() => handlePaymentMethod(method.id)}
            activeOpacity={0.7}
          >
            <View style={styles.methodIcon}>
              <Icon name={method.icon} size={24} color={colors.primary} />
            </View>
            <View style={styles.methodInfo}>
              <Text style={styles.methodTitle}>{method.title}</Text>
              <Text style={styles.methodSubtitle}>{method.subtitle}</Text>
            </View>
            <Icon name="chevron-right" size={24} color={colors.textLight} />
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.securityInfo}>
        <View style={styles.securityIcon}>
          <Icon name="security" size={20} color={colors.primary} />
        </View>
        <Text style={styles.securityText}>
          Seus dados estão protegidos com criptografia de ponta a ponta
        </Text>
      </View>

      <View style={styles.bottomActions}>
        <TouchableOpacity
          style={styles.homeButton}
          onPress={handleBackToHome}
        >
          <Icon name="home" size={20} color={colors.primary} />
          <Text style={styles.homeButtonText}>Voltar à Home</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.medium,
    paddingVertical: spacing.large,
    paddingTop: 60,
  },
  backButton: {
    marginRight: spacing.medium,
  },
  headerTitle: {
    fontSize: fontSizes.large,
    fontWeight: 'bold',
    color: colors.text,
    flex: 1,
  },
  selectedPlanContainer: {
    backgroundColor: colors.secondary,
    marginHorizontal: spacing.medium,
    borderRadius: 12,
    padding: spacing.medium,
    marginBottom: spacing.large,
  },
  selectedPlanTitle: {
    fontSize: fontSizes.small,
    color: colors.textLight,
    marginBottom: spacing.small,
  },
  planSummary: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  planName: {
    fontSize: fontSizes.medium,
    fontWeight: 'bold',
    color: colors.text,
    flex: 1,
  },
  planPrice: {
    fontSize: fontSizes.medium,
    fontWeight: 'bold',
    color: colors.primary,
  },
  planDiscount: {
    fontSize: fontSizes.small,
    color: colors.primary,
    fontWeight: 'bold',
    position: 'absolute',
    right: 0,
    bottom: -20,
  },
  paymentMethodsContainer: {
    paddingHorizontal: spacing.medium,
    marginBottom: spacing.large,
  },
  sectionTitle: {
    fontSize: fontSizes.medium,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: spacing.medium,
  },
  paymentMethodCard: {
    backgroundColor: colors.secondary,
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.medium,
    borderRadius: 12,
    marginBottom: spacing.small,
  },
  methodIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: `${colors.primary}20`,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.medium,
  },
  methodInfo: {
    flex: 1,
  },
  methodTitle: {
    fontSize: fontSizes.medium,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 2,
  },
  methodSubtitle: {
    fontSize: fontSizes.small,
    color: colors.textLight,
  },
  securityInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.medium,
    paddingVertical: spacing.medium,
    backgroundColor: `${colors.primary}10`,
    marginHorizontal: spacing.medium,
    borderRadius: 8,
    marginBottom: spacing.large,
  },
  securityIcon: {
    marginRight: spacing.small,
  },
  securityText: {
    fontSize: fontSizes.small,
    color: colors.text,
    flex: 1,
  },
  bottomActions: {
    paddingHorizontal: spacing.medium,
    paddingBottom: 40,
  },
  homeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.medium,
    gap: spacing.small,
  },
  homeButtonText: {
    color: colors.primary,
    fontSize: fontSizes.medium,
    fontWeight: 'bold',
  },
});