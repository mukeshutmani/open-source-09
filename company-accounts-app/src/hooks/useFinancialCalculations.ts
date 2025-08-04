import { useMemo } from 'react'

interface FinancialData {
  ordinaryShareCapital: number
  preferenceShareCapital: number
  capitalReserve: number
  generalReserve: number
  unappropriatedProfit: number
  otherRetainedEarnings: number
  surplusOnRevaluation: number
  unrealizedGain: number
  directorsLoan: number
  subordinatedDebt: number
  faceValue: number
}

export const useFinancialCalculations = (financialData: FinancialData) => {
  const totalEquityTier1 = useMemo(() => {
    return financialData.ordinaryShareCapital + 
           financialData.preferenceShareCapital + 
           financialData.capitalReserve + 
           financialData.generalReserve + 
           financialData.unappropriatedProfit + 
           financialData.otherRetainedEarnings
  }, [
    financialData.ordinaryShareCapital,
    financialData.preferenceShareCapital,
    financialData.capitalReserve,
    financialData.generalReserve,
    financialData.unappropriatedProfit,
    financialData.otherRetainedEarnings
  ])

  const totalEquity = useMemo(() => {
    return totalEquityTier1 + 
           financialData.surplusOnRevaluation + 
           financialData.unrealizedGain + 
           financialData.directorsLoan + 
           financialData.subordinatedDebt
  }, [
    totalEquityTier1, 
    financialData.surplusOnRevaluation,
    financialData.unrealizedGain,
    financialData.directorsLoan,
    financialData.subordinatedDebt
  ])

  const isUnbalanced = useMemo(() => {
    return totalEquity !== 0
  }, [totalEquity])

  return {
    totalEquityTier1,
    totalEquity,
    isUnbalanced
  }
}