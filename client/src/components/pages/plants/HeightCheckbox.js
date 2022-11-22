import { useState, useEffect, useCallback } from 'react'

import { Flex, Checkbox, CheckboxGroup, Accordion, AccordionItem, AccordionButton, AccordionPanel, AccordionIcon, Box, Stack } from '@chakra-ui/react'

const HeightCheckBox = ({ plants, setFilteredPlants, filteredPlants }) => {


  
  const filterOptions = [
    {
      'id': 1,
      'plantHeight': 'small',
    },
    {
      'id': 2,
      'plantHeight': 'medium',
    },
    {
      'id': 3,
      'plantHeight': 'large',
    }
  ]  
  
  const [checkedSmall, setCheckedSmall] = useState(false)
  const [checkedMedium, setCheckedMedium] = useState(false)
  const [checkedLarge, setCheckedLarge] = useState(false)

  // const [filteredPlants, setFilteredPlants] = useState([])

  
  const handleToggle = (e) => {
    if (e.target.value === 'small') {
      setCheckedSmall(!checkedSmall)
    }
    if (e.target.value === 'medium') {
      setCheckedMedium(!checkedMedium)
    }
    if (e.target.value === 'large') {
      setCheckedLarge(!checkedLarge)
    }
  }
  
  useEffect(() => {
    // console.log('small --> ' + checkedSmall)
    // console.log('medium --> ' + checkedMedium)
    // console.log('large --> ' + checkedLarge)

    const filterPlants = () => {
    // const regex = new RegExp(search, 'i')
      if (checkedSmall) {
        console.log('check small')
        const filtered = plants.filter(plant => plant.plantHeight === 'small') 
        const unique = []
        for (let i = 0; i < filtered.length; i++) {
          if (!filteredPlants.includes(filtered[i])){
            unique.push(filtered[i])
          }
        }
        console.log(unique)
        const newFiltered = [ ...filteredPlants ].concat(unique)
        console.log(newFiltered)
        setFilteredPlants(newFiltered)
      }
      if (!checkedSmall) {
        console.log('uncheck small')
        const newFiltered = filteredPlants.filter(plant => plant.plantHeight !== 'small')
        setFilteredPlants(newFiltered)
      }
      if (checkedMedium) {
        console.log('check medium')
        const filtered = plants.filter(plant => plant.plantHeight === 'medium') 
        const unique = []
        for (let i = 0; i < filtered.length; i++) {
          if (!filteredPlants.includes(filtered[i])){
            unique.push(filtered[i])
          }
        }
        console.log(unique)
        const newFiltered = [ ...filteredPlants ].concat(unique)
        console.log(newFiltered)
        setFilteredPlants(newFiltered)
      }
      if (!checkedMedium) {
        console.log('uncheck medium')
        const newFiltered = filteredPlants.filter(plant => plant.plantHeight !== 'medium')
        setFilteredPlants(newFiltered)
      }
      if (checkedLarge) {
        console.log('check large')
        const filtered = plants.filter(plant => plant.plantHeight === 'large') 
        const unique = []
        for (let i = 0; i < filtered.length; i++) {
          if (!filteredPlants.includes(filtered[i])){
            unique.push(filtered[i])
          }
        }
        console.log(unique)
        const newFiltered = [ ...filteredPlants ].concat(unique)
        console.log(newFiltered)
        setFilteredPlants(newFiltered)
      }
      if (!checkedLarge) {
        console.log('uncheck large')
        const newFiltered = filteredPlants.filter(plant => plant.plantHeight !== 'large')
        setFilteredPlants(newFiltered)
      }
    }
    filterPlants()
  }, [checkedSmall, checkedMedium, checkedLarge])

 

  return (
    <>
      <Accordion allowMultiple>
        <AccordionItem>
          <AccordionButton>
            <Box flex='1' textAlign='left'>
              Plant Height
            </Box>
            <AccordionIcon />
          </AccordionButton>
          <AccordionPanel>
            <Stack spacing={5} direction='column'>
              <Flex>
                <Flex className="filters-options">
                  {filterOptions.map(option => {
                    // const joined = option.split('').join('-')
                    return (
                      <Flex key={option.plantHeight} className={`${option.plantHeight}-filter`}>
                        <input className={`${option.plantHeight}-checkbox`} type="checkbox" value={option.plantHeight} onChange={handleToggle} />
                        <label>{option.plantHeight}</label>
                      </Flex>
                    )
                  })}
                </Flex>
              </Flex>
            </Stack>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </>
  )  
}

export default HeightCheckBox

{/* <Flex>
        <Flex>filters</Flex>
        <Flex className="filters-options">
          {filterOptions.map(option => {
            const joined = option.split('').join('-')
            return (
              <Flex key={option} className={`${joined}-filter`}>
                <input className={`${joined}-checkbox`} type="checkbox" value={joined} checked onChange={}/>
                <label>{option}</label>
              </Flex>
            )
          })}
        </Flex>
        </Flex>

        <Stack spacing={5} direction='column'>
          {filterOptions.map(option => {
            return (
              <Checkbox>option</Checkbox>
            )  
          })}
        </Stack> */}