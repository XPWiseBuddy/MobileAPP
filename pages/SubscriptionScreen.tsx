import React, { useState } from 'react';
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

export default function SubscriptionScreen({ navigation }: any) {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  const plans = [
    {
      id: 'monthly',
      title: 'Plano Mensal',
      price: 'R$ 29,90',
      period: '/mês',
      benefits: [
        'Consultas ilimitadas ao WiseBuddy',
        'Análise de perfil de investidor',
        'Recomendações personalizadas',
        'Histórico de consultas',
        'Suporte prioritário'
      ],
      popular: false
    },
    {
      id: 'annual',
      title: 'Plano Anual',
      price: 'R$ 299,90',
      period: '/ano',
      originalPrice: 'R$ 358,80',
      discount: '17% de desconto',
      benefits: [
        'Todas as funcionalidades do plano mensal',
        'Análises avançadas de carteira',
        'Relatórios mensais personalizados',
        'Acesso antecipado a novas funcionalidades',
        'Consultoria premium (1x por mês)',
        'Suporte 24/7'
      ],
      popular: true
    },
    {
      id: 'consultation',
      title: 'Consulta Avulsa',
      price: 'R$ 9,90',
      period: '/consulta',
      benefits: [
        'Uma consulta ao WiseBuddy',
        'Análise básica de perfil',
        'Recomendação específica',
        'Válida por 24 horas'
      ],
      popular: false
    }
  ];

  const handleSelectPlan = (planId: string) => {
    setSelectedPlan(planId);
  };

  const handleViewDetails = (plan: any) => {
    Alert.alert(
      `Detalhes - ${plan.title}`,
      `Preço: ${plan.price}${plan.period}\n\nBenefícios:\n${plan.benefits.join('\n• ')}\n\n${plan.discount ? `💰 ${plan.discount}` : ''}`,
      [{ text: 'Fechar', style: 'cancel' }]
    );
  };

  const handleProceedToPayment = () => {
    if (!selectedPlan) {
      Alert.alert('Atenção', 'Por favor, selecione um plano antes de continuar.');
      return;
    }
    
    const plan = plans.find(p => p.id === selectedPlan);
    navigation.navigate('Payment', { selectedPlan: plan });
  };

  const handleBackToHome = () => {
    navigation.navigate('Main', { screen: 'Home' });
  };

  const renderPlan = (plan: any) => (
    <View key={plan.id} style={[
      styles.planCard,
      plan.popular && styles.popularPlan,
      selectedPlan === plan.id && styles.selectedPlan
    ]}>
      {plan.popular && (
        <View style={styles.popularBadge}>
          <Text style={styles.popularText}>MAIS POPULAR</Text>
        </View>
      )}
      
      <View style={styles.planHeader}>
        <Text style={styles.planTitle}>{plan.title}</Text>
        <View style={styles.priceContainer}>
          {plan.originalPrice && (
            <Text style={styles.originalPrice}>{plan.originalPrice}</Text>
          )}
          <Text style={styles.planPrice}>{plan.price}</Text>
          <Text style={styles.planPeriod}>{plan.period}</Text>
        </View>
        {plan.discount && (
          <Text style={styles.discount}>{plan.discount}</Text>
        )}
      </View>

      <View style={styles.benefitsContainer}>
        {plan.benefits.map((benefit: string, index: number) => (
          <View key={index} style={styles.benefitItem}>
            <Icon name="check-circle" size={16} color={colors.primary} />
            <Text style={styles.benefitText}>{benefit}</Text>
          </View>
        ))}
      </View>

      <View style={styles.planActions}>
        <TouchableOpacity
          style={styles.detailsButton}
          onPress={() => handleViewDetails(plan)}
        >
          <Text style={styles.detailsButtonText}>Ver Detalhes</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[
            styles.selectButton,
            selectedPlan === plan.id && styles.selectedButton
          ]}
          onPress={() => handleSelectPlan(plan.id)}
        >
          <Text style={[
            styles.selectButtonText,
            selectedPlan === plan.id && styles.selectedButtonText
          ]}>
            {selectedPlan === plan.id ? 'Selecionado' : 'Selecionar Plano'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={handleBackToHome}
        >
          <Icon name="arrow-back" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Planos de Assinatura</Text>
      </View>

      <Text style={styles.subtitle}>
        Escolha o plano ideal para suas necessidades de investimento
      </Text>

      <View style={styles.plansContainer}>
        {plans.map(renderPlan)}
      </View>

      <View style={styles.bottomActions}>
        <TouchableOpacity
          style={[
            styles.paymentButton,
            !selectedPlan && styles.disabledButton
          ]}
          onPress={handleProceedToPayment}
          disabled={!selectedPlan}
        >
          <Text style={[
            styles.paymentButtonText,
            !selectedPlan && styles.disabledButtonText
          ]}>
            Avançar para Pagamento
          </Text>
          <Icon 
            name="arrow-forward" 
            size={20} 
            color={!selectedPlan ? colors.textLight : colors.background} 
          />
        </TouchableOpacity>

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
  subtitle: {
    fontSize: fontSizes.medium,
    color: colors.textLight,
    textAlign: 'center',
    marginHorizontal: spacing.medium,
    marginBottom: spacing.large,
  },
  plansContainer: {
    paddingHorizontal: spacing.medium,
    paddingBottom: spacing.large,
  },
  planCard: {
    backgroundColor: colors.secondary,
    borderRadius: 12,
    padding: spacing.medium,
    marginBottom: spacing.medium,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  popularPlan: {
    borderColor: colors.primary,
    position: 'relative',
  },
  selectedPlan: {
    borderColor: colors.primary,
    backgroundColor: `${colors.primary}10`,
  },
  popularBadge: {
    position: 'absolute',
    top: -8,
    right: spacing.medium,
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.small,
    paddingVertical: 4,
    borderRadius: 8,
  },
  popularText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: colors.background,
  },
  planHeader: {
    marginBottom: spacing.medium,
  },
  planTitle: {
    fontSize: fontSizes.medium,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: spacing.small,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: 4,
  },
  originalPrice: {
    fontSize: fontSizes.small,
    color: colors.textLight,
    textDecorationLine: 'line-through',
    marginRight: spacing.small,
  },
  planPrice: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.primary,
  },
  planPeriod: {
    fontSize: fontSizes.small,
    color: colors.textLight,
    marginLeft: 4,
  },
  discount: {
    fontSize: fontSizes.small,
    color: colors.primary,
    fontWeight: 'bold',
  },
  benefitsContainer: {
    marginBottom: spacing.medium,
  },
  benefitItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.small,
  },
  benefitText: {
    fontSize: fontSizes.small,
    color: colors.text,
    marginLeft: spacing.small,
    flex: 1,
  },
  planActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: spacing.small,
  },
  detailsButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: spacing.medium,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.primary,
    alignItems: 'center',
  },
  detailsButtonText: {
    color: colors.primary,
    fontSize: fontSizes.small,
    fontWeight: 'bold',
  },
  selectButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: spacing.medium,
    borderRadius: 8,
    backgroundColor: colors.primary,
    alignItems: 'center',
  },
  selectedButton: {
    backgroundColor: colors.text,
  },
  selectButtonText: {
    color: colors.background,
    fontSize: fontSizes.small,
    fontWeight: 'bold',
  },
  selectedButtonText: {
    color: colors.background,
  },
  bottomActions: {
    paddingHorizontal: spacing.medium,
    paddingBottom: 40,
    gap: spacing.medium,
  },
  paymentButton: {
    backgroundColor: colors.primary,
    paddingVertical: spacing.medium,
    paddingHorizontal: spacing.medium,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.small,
  },
  disabledButton: {
    backgroundColor: colors.secondary,
    borderWidth: 1,
    borderColor: colors.textLight,
  },
  paymentButtonText: {
    color: colors.background,
    fontSize: fontSizes.medium,
    fontWeight: 'bold',
  },
  disabledButtonText: {
    color: colors.textLight,
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