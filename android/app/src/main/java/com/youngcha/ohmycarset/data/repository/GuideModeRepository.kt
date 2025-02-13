package com.youngcha.ohmycarset.data.repository

import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData
import com.youngcha.ohmycarset.data.api.GuideModeApiService
import com.youngcha.ohmycarset.data.dto.Category
import com.youngcha.ohmycarset.data.model.GuideParam
import com.youngcha.ohmycarset.data.model.car.Car
import com.youngcha.ohmycarset.data.model.car.OptionInfo
import com.youngcha.ohmycarset.util.guideModeFilterData
import com.youngcha.ohmycarset.util.retryApiCall

class GuideModeRepository(private val guideModeApiService: GuideModeApiService) {

    private val _car = MutableLiveData<Car>()
    val car: LiveData<Car> = _car

    suspend fun getAllGuideDataAndSetCar(guideParam: GuideParam, categories: List<Category>) {
        val powerTrain = guideModeFilterData(
            retryApiCall {
                guideModeApiService.getPowerTrainGuide(
                    guideParam.id, guideParam.age, guideParam.gender,
                    guideParam.keyword1Id, guideParam.keyword2Id, guideParam.keyword3Id
                )
            } ?: return, "main"
        )

        val drivingSystem = guideModeFilterData(
            retryApiCall {
                guideModeApiService.getDrivingSystem(
                    guideParam.id, guideParam.age, guideParam.gender,
                    guideParam.keyword1Id, guideParam.keyword2Id, guideParam.keyword3Id
                )
            } ?: return, "main"
        )

        val bodyType = guideModeFilterData(
            retryApiCall {
                guideModeApiService.getBodyTypeGuide(
                    guideParam.id, guideParam.age, guideParam.gender,
                    guideParam.keyword1Id, guideParam.keyword2Id, guideParam.keyword3Id
                )
            } ?: return, "main"
        )

        val exteriorColor = guideModeFilterData(
            retryApiCall {
                guideModeApiService.getExteriorColorGuide(
                    guideParam.id, guideParam.age, guideParam.gender,
                    guideParam.keyword1Id, guideParam.keyword2Id, guideParam.keyword3Id
                )
            } ?: return, "color"
        )

        val firstExteriorId = exteriorColor.firstOrNull()?.id
        val interiorColor = if (firstExteriorId != null)
            guideModeFilterData(
                retryApiCall {
                    guideModeApiService.getInteriorColorGuide(
                        guideParam.id, guideParam.age, guideParam.gender,
                        guideParam.keyword1Id, guideParam.keyword2Id,
                        guideParam.keyword3Id, firstExteriorId
                    )
                } ?: return, "color"
            )
        else emptyList()

        val wheel = if (firstExteriorId != null)
            guideModeFilterData(
                retryApiCall {
                    guideModeApiService.getWheelGuide(
                        guideParam.id, guideParam.age, guideParam.gender,
                        guideParam.keyword1Id, guideParam.keyword2Id,
                        guideParam.keyword3Id, firstExteriorId
                    )
                } ?: return, "main"
            )
        else emptyList()

        val options = createSubOptionMap(
            categories, guideModeFilterData(
                retryApiCall {
                    guideModeApiService.getOptionsGuide(
                        guideParam.id, guideParam.age, guideParam.gender,
                        guideParam.keyword1Id, guideParam.keyword2Id,
                        guideParam.keyword3Id
                    )
                } ?: return, "sub"
            )
        )

        val mainOptionsMap = mapOf(
            "파워 트레인" to powerTrain,
            "구동 방식" to drivingSystem,
            "바디 타입" to bodyType,
            "외장 색상" to exteriorColor,
            "내장 색상" to interiorColor,
            "휠 선택" to wheel
        )

        // '옵션 선택'은 별도로 subOptions에 추가
        val subOptionsMap = mapOf(
            "옵션 선택" to options
        )

        val subOptionsList = subOptionsMap.values.toList()

        val updatedCar = Car(
            mainOptions = listOf(mainOptionsMap),
            subOptions = subOptionsList
        )
        _car.postValue(updatedCar)
    }

    fun createSubOptionMap(
        categories: List<Category>,
        options: List<OptionInfo>
    ): Map<String, List<OptionInfo>> {
        // 카테고리 ID를 key로, 카테고리 이름을 value로 갖는 Map 생성
        val categoryIdToNameMap = categories.associateBy({ it.id }, { it.name })

        // OptionInfo List를 카테고리 ID를 기준으로 그룹화
        val groupedOptions = options.groupBy { it.categoryId }

        // 그룹화된 OptionInfo를 카테고리 이름으로 변환
        return groupedOptions.mapKeys { categoryIdToNameMap[it.key] ?: "옵션 선택" }
    }

}