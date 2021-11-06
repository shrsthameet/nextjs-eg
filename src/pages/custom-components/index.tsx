import { FC, useState } from 'react'
import {
  Accordion,
  AnswerCard,
  Button,
  Divider,
  FlexContainer,
  Input, Option,
  PageTitle,
  Select,
  Switch,
  Typography
} from 'Components'
import { FunctionWithParam } from '../../Utils/Types'

interface OptionListType {
    disName: string,
    value: string
}

const optionList:OptionListType[] = [
  {
    disName: 'prazwal',
    value: 'aoisdalksdj'
  },
  {
    disName: 'ameet',
    value: '98h3nolksas'
  },
  {
    disName: 'bivek',
    value: '0138jlaksds'
  },
  {
    disName: 'saroj',
    value: 'pqw9jdlksds'
  }
]

const Components:FC = () => {
  const [switchToggle, setSwitchToggle] = useState(true)
  const [availableOptionList, setAvailableOptionList] = useState<OptionListType[]>(optionList)

  const [values, setValues] = useState({
    speaker: [],
    moderator: 'aoisdalksdj',
    comoderator: ''
  })

  const handleSelect:FunctionWithParam<{ name: string, value: string | string[] }> = ({ name, value }) => {
    setValues(prevState => ({ ...prevState, [name]: value }))
  }

  const handleFilter:FunctionWithParam<string> = value => {
    setAvailableOptionList(optionList.filter(option => option.disName.includes(value)))
  }

  return(
    <FlexContainer direction='col'>
      <Typography variant='h1'>Heading-1</Typography>
      <Typography weight='bold' variant='h2'>Heading-2 bold</Typography>
      <Typography variant='h3'>Heading-3</Typography>
      <Typography weight='bold' variant='h4'>Heading-4 bold</Typography>
      <Typography variant='h5'>Heading-5</Typography>
      <Typography weight='bold' variant='h6'>Heading-6 bold</Typography>
      <Typography variant='p'>Paragraph</Typography>
      <Button variant={'primary'}>Button primary</Button>
      <Button variant={'secondary'}>Button secondary</Button>
      <Button variant={'text'}>Button text</Button>
      <Button variant={'navGray'}>Button nav gray</Button>
      <Button variant={'navBlue'}>Button nav blue</Button>
      <Button loading={true} >Button loading</Button>
      <Button disabled={true}>Button disabled</Button>
      <Divider />
      <Input name={'Text'} error={null} type={'text'} placeholder={'Text & size small'} category='small' />
      <Input name={'Search'} error={null} type={'search'} placeholder={'Search & size small'} category='small' />
      <Input name={'Password'} error={null} type={'password'} placeholder={'Password & size default/medium'} category='medium' />
      <Input name={'Number'} error={null} type={'number'} placeholder={'Number'} />
      <Input name={'Email'} error={null} type={'email'} placeholder={'Email  & size large'} category='large' />
      <Input name={'Text'} error={'Has error text'} type={'text'} placeholder={'Error'} />
      <PageTitle title={'title for page'} />
      <Switch checked={switchToggle} label={'switch'} icons={false} toggleHandler={() => setSwitchToggle(!switchToggle)} />
      <Divider />
      <AnswerCard handleAnswerSelect={ans => console.log(ans)} isSelected={true} option={{ displayOption: 'Selected', value: 'selected' }} />
      <AnswerCard handleAnswerSelect={ans => console.log(ans)} isSelected={false} option={{ displayOption: 'Not Selected', value: 'notSelected' }} />
      <Accordion index={1} title={'sample'} content={'content'} selected={0} toggleAccordion={() => {}} />
      <Divider />
      <Divider />
      <Divider />
      <Divider />
      <Select placeholder='moderator' name='moderator' onFilter={handleFilter} mode='single' value={values.moderator} onChange={handleSelect}>
        {availableOptionList && availableOptionList.length > 0
          ? availableOptionList.map(option => <Option key={option.value} value={option.value}>{option.disName}</Option>)
          : null}
      </Select>
      <Select placeholder='comoderator' name='comoderator' onFilter={handleFilter} mode='single' value={values.comoderator} onChange={handleSelect}>
        {availableOptionList && availableOptionList.length > 0
          ? availableOptionList.map(option => <Option key={option.value} value={option.value}>{option.disName}</Option>)
          : null}
      </Select>
      <Select placeholder='speaker' name='speaker' mode='multiple' onFilter={handleFilter} value={values.speaker} onChange={handleSelect}>
        {availableOptionList && availableOptionList.length > 0
          ? availableOptionList.map(option => <Option key={option.value} value={option.value}>{option.disName}</Option>)
          : null}
      </Select>
      <Divider />
      <Divider />
      <Divider />
      <video src={'https://antmedia-test-ee.thebuildingdecision.com:5443/thebuildingdecision/play.html?name=887985603466435358239257&playOrder=hls&token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0eXBlIjoicGxheSIsInN0cmVhbUlkIjoiODg3OTg1NjAzNDY2NDM1MzU4MjM5MjU3In0.Tqqlby25oZ9WLO7JqNb2CJga2JWfWeoKv-1GxA9cIAI'} autoPlay={true} controls={true}  />
    </FlexContainer>
  )
}

export default Components
