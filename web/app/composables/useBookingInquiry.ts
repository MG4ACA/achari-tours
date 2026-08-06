/**
 * Composable for booking inquiry form state management and submission.
 */

export interface InquiryFormData {
  tourId: string
  tourTitle: string
  preferredStartDate: string
  preferredEndDate: string
  adultCount: number
  childCount: number
  selectedAddons: string[]
  specialRequests: string
  firstName: string
  lastName: string
  email: string
  phone: string
  country: string
}

interface InquiryResponse {
  id: string
  referenceCode: string
  message: string
}

export function useBookingInquiry() {
  const config = useRuntimeConfig()
  const apiBaseUrl = config.public.apiBaseUrl as string

  const isSubmitting = ref(false)
  const isSubmitted = ref(false)
  const error = ref<string | null>(null)
  const referenceCode = ref<string | null>(null)

  const form = reactive<InquiryFormData>({
    tourId: '',
    tourTitle: '',
    preferredStartDate: '',
    preferredEndDate: '',
    adultCount: 2,
    childCount: 0,
    selectedAddons: [],
    specialRequests: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    country: '',
  })

  const currentStep = ref(1)
  const totalSteps = 3

  function nextStep() {
    if (currentStep.value < totalSteps) {
      currentStep.value++
    }
  }

  function prevStep() {
    if (currentStep.value > 1) {
      currentStep.value--
    }
  }

  function validateStep(step: number): boolean {
    error.value = null

    switch (step) {
      case 1:
        if (!form.preferredStartDate) {
          error.value = 'Please select your preferred travel dates.'
          return false
        }
        if (form.adultCount < 1) {
          error.value = 'At least one adult traveler is required.'
          return false
        }
        return true

      case 2:
        // Add-ons and special requests are optional
        return true

      case 3:
        if (!form.firstName.trim() || !form.lastName.trim()) {
          error.value = 'Please enter your full name.'
          return false
        }
        if (!form.email.trim() || !isValidEmail(form.email)) {
          error.value = 'Please enter a valid email address.'
          return false
        }
        if (!form.country.trim()) {
          error.value = 'Please select your country.'
          return false
        }
        return true

      default:
        return true
    }
  }

  function isValidEmail(email: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  }

  async function submitInquiry(): Promise<boolean> {
    if (!validateStep(3)) return false

    isSubmitting.value = true
    error.value = null

    try {
      const response = await $fetch<InquiryResponse>(`${apiBaseUrl}/inquiries`, {
        method: 'POST',
        body: {
          tourId: form.tourId,
          tourTitle: form.tourTitle,
          preferredStartDate: form.preferredStartDate,
          preferredEndDate: form.preferredEndDate,
          adultCount: form.adultCount,
          childCount: form.childCount,
          selectedAddons: form.selectedAddons,
          specialRequests: form.specialRequests,
          firstName: form.firstName,
          lastName: form.lastName,
          email: form.email,
          phone: form.phone,
          country: form.country,
          // UTM tracking
          utmSource: useRoute().query.utm_source as string || '',
          utmMedium: useRoute().query.utm_medium as string || '',
          utmCampaign: useRoute().query.utm_campaign as string || '',
          referrerUrl: document?.referrer || '',
        },
      })

      referenceCode.value = response.referenceCode
      isSubmitted.value = true
      return true
    } catch (err: any) {
      error.value = err?.data?.message || 'Something went wrong. Please try again or contact us directly.'
      return false
    } finally {
      isSubmitting.value = false
    }
  }

  function resetForm() {
    Object.assign(form, {
      tourId: '',
      tourTitle: '',
      preferredStartDate: '',
      preferredEndDate: '',
      adultCount: 2,
      childCount: 0,
      selectedAddons: [],
      specialRequests: '',
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      country: '',
    })
    currentStep.value = 1
    isSubmitted.value = false
    error.value = null
    referenceCode.value = null
  }

  return {
    form,
    currentStep,
    totalSteps,
    isSubmitting,
    isSubmitted,
    error,
    referenceCode,
    nextStep,
    prevStep,
    validateStep,
    submitInquiry,
    resetForm,
  }
}
