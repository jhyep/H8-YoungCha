package com.youngcha.ohmycarset.ui.customview

import android.content.Context
import android.graphics.Rect
import android.util.AttributeSet
import android.util.Log
import android.view.LayoutInflater
import android.view.MotionEvent
import android.view.View
import android.view.ViewPropertyAnimator
import android.widget.ImageButton
import androidx.constraintlayout.widget.ConstraintLayout
import com.youngcha.ohmycarset.R
import com.youngcha.ohmycarset.databinding.LayoutHyundaiButtonBinding
import com.youngcha.ohmycarset.data.model.car.OptionInfo

class HyundaiButtonView @JvmOverloads constructor(
    context: Context, attrs: AttributeSet? = null, defStyleAttr: Int = 0
) : ConstraintLayout(context, attrs, defStyleAttr) {

    var binding: LayoutHyundaiButtonBinding

    init {
        val inflater = LayoutInflater.from(context)

        binding = LayoutHyundaiButtonBinding.inflate(inflater, this, true)
    }

    val ibDetail: ImageButton
        get() = binding.ibDetail

    private var onClickAction: (() -> Unit)? = null

    fun setOnClickAction(action: (() -> Unit)?) {
        onClickAction = action
    }

    override fun dispatchTouchEvent(event: MotionEvent): Boolean {
        if (event.action == MotionEvent.ACTION_UP && !isTouchInsideIbDetail(event)) {
            onClickAction?.invoke()
        }
        return super.dispatchTouchEvent(event)
    }


    fun isTouchInsideIbDetail(event: MotionEvent): Boolean {
        val rect = Rect()
        binding.ibDetail.getHitRect(rect)
        return rect.contains(event.x.toInt(), event.y.toInt())
    }


    fun setCurrentType(currentType: String) {
        binding.currentType = currentType
        binding.executePendingBindings()
    }

    fun setOptionInfo(optionInfo: OptionInfo) {
        binding.optionInfo = optionInfo
        binding.executePendingBindings()
    }

    fun setCurrentComponentName(componentName: String) {
        binding.componentName = componentName
        binding.executePendingBindings()
    }

    fun setIsVisible(isVisible: Int) {
        binding.isVisible = isVisible
        binding.executePendingBindings()
    }

    fun setIsViewPager(isViewPager: Boolean) {
        binding.isViewPager = isViewPager
        binding.executePendingBindings()
    }

    fun setDetailClickListener(listener: OnClickListener) {
        binding.ibDetail.setOnClickListener {
            listener.onClick(it)
        }
    }

    fun animateBorder(): ViewPropertyAnimator {
        binding.vBottomLine.animate().cancel()
        binding.vTopLine.animate().cancel()
        binding.vLeftLine.animate().cancel()
        binding.vRightLine.animate().cancel()

        binding.vBottomLine.scaleX = 0f
        binding.vTopLine.scaleX = 0f
        binding.vLeftLine.scaleY = 0f
        binding.vRightLine.scaleY = 0f

        binding.vBottomLine.visibility = visibility
        binding.vTopLine.visibility = visibility
        binding.vLeftLine.visibility = visibility
        binding.vRightLine.visibility = visibility

        binding.vTopLine.pivotX = 0f
        binding.vTopLine.animate()
            .setDuration(500)
            .scaleX(1f)
            .withEndAction {
                binding.vRightLine.pivotY = 0f
                binding.vRightLine.animate()
                    .setDuration(500)
                    .scaleY(1f)
                    .withEndAction {
                        binding.vBottomLine.pivotX = binding.vBottomLine.width.toFloat()
                        binding.vBottomLine.animate()
                            .setDuration(500)
                            .scaleX(1f)
                            .withEndAction {
                                binding.vLeftLine.pivotY = binding.vLeftLine.height.toFloat()
                                binding.vLeftLine.animate()
                                    .setDuration(500)
                                    .scaleY(1f)
                            }
                    }
            }

        return binding.vLeftLine.animate()  // 마지막 애니메이션의 애니메이터 반환
    }
}