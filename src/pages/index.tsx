import { useEffect, useState } from 'react'

import { useUserContext } from '../Context'

import {
  BannerCarousel,
  EventCarousel,
  Footer, HostCarousel,
  ProtectedPagesLayout,
  ReviewCarousel, ScreenLoading,
  SinglePageScroll,
  SurveyQuestions
} from 'Components'

import { FunctionWithParam, Nullable } from 'Utils/Types/main'
import Questionnaire from '../Components/Questionnaire/Questionnaire'
import { FieldTypeBanner, FieldTypeQuestionnaire, FieldTypeQuestionnaireAnswers, UpcomingEventsType } from '../Utils/Types'
import { NextPage } from 'next'
import { apiQuestionnaire } from '../ApiCalls/Questionnaire'
import { apiGetBannerList, apiGetUpcomingEvents } from '../ApiCalls/OtherApi'


const Home:NextPage = () =>  {

  const { user: { showQuestionnaire, loading }, isLoggedIn } = useUserContext()

  const [keyIndex, setKeyIndex] = useState<number>(0)
  const [showingQuestionnaire, setShowingQuestionnaire] = useState<boolean>(showQuestionnaire)
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
  const totalComponents = isLoggedIn ? 5 : 6
  const [questionList, setQuestionList] = useState<Nullable<FieldTypeQuestionnaire[]>>(null)
  const [bannerList, setBannerList] = useState<Nullable<FieldTypeBanner[]>>(null)
  const [upcomingEvents, setUpcomingEvents] = useState<Nullable<UpcomingEventsType[]>>(null)

  useEffect(() => {
    const fetchQuestions = async () => {
      const res = await apiQuestionnaire.get()
      if(res && res.success && res.data)
        setQuestionList(res.data)
    }
    fetchQuestions()
  }, [])

  useEffect(() => {
    const fetchBanners = async () => {
      const res = await apiGetBannerList()
      if(res && res.success && res.data)
        setBannerList(res.data)
    }
    fetchBanners()
  }, [])

  useEffect(() => {
    const fetchUpcomingEvents = async () => {
      const res = await apiGetUpcomingEvents()
      if(res && res.success && res.data)
        setUpcomingEvents(res.data)
    }
    fetchUpcomingEvents()
  }, [])


  useEffect(() => {
    if(showQuestionnaire) setShowingQuestionnaire(showQuestionnaire)
  }, [showQuestionnaire])

  const submitQuestionnaire:FunctionWithParam<FieldTypeQuestionnaireAnswers[]> = async value => {
    setIsSubmitting(true)
    const res = await apiQuestionnaire.submitAnswers(value)
    if(res && res.success)
      location.reload()
    setIsSubmitting(false)
  }

  const renderComponent = index => {
    if(isLoggedIn){
      switch (index){
      case 0:
        return <BannerCarousel bannerList={bannerList} />
      case 1:
        return <EventCarousel />
      case 2:
        return <HostCarousel />
      case 3:
        return <ReviewCarousel />
      case 4:
        return <Footer />
      default:
        return <></>
      }
    }else{
      switch (index){
      case 0:
        return <BannerCarousel bannerList={bannerList} />
      case 1:
        return <SurveyQuestions />
      case 2:
        return <EventCarousel />
      case 3:
        return <HostCarousel />
      case 4:
        return <ReviewCarousel />
      case 5:
        return <Footer />
      default:
        return <></>
      }
    }

  }

  const handleIndexChange:FunctionWithParam<number> = index => {
    setKeyIndex(index)
  }

  return (
    <>
      {loading
        ? <ScreenLoading />
        : showingQuestionnaire
          ? <Questionnaire questionList={questionList} submitQuestionnaire={submitQuestionnaire} isSubmitting={isSubmitting} />
          : (
            <ProtectedPagesLayout pageTitle='The Building Decision'>
              <SinglePageScroll keyIndex={keyIndex} setKeyIndex={handleIndexChange} totalComponents={totalComponents}>
                {renderComponent(keyIndex)}
              </SinglePageScroll>
            </ProtectedPagesLayout>
          )}
      {isSubmitting ? <ScreenLoading /> : null}
    </>
  )
}

export default Home
