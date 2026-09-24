package com.example.siperpus.scanner

import android.animation.ValueAnimator
import android.content.Context
import android.graphics.Canvas
import android.graphics.Paint
import android.graphics.PorterDuff
import android.graphics.PorterDuffXfermode
import android.graphics.RectF
import android.util.AttributeSet
import android.view.View
import androidx.core.content.ContextCompat
import com.example.siperpus.R

class BarcodeBoxOverlay @JvmOverloads constructor(
    context: Context,
    attrs: AttributeSet? = null,
    defStyleAttr: Int = 0
) : View(context, attrs, defStyleAttr) {

    private val scrimPaint = Paint(Paint.ANTI_ALIAS_FLAG).apply {
        color = ContextCompat.getColor(context, R.color.scanner_overlay)
    }

    private val eraserPaint = Paint(Paint.ANTI_ALIAS_FLAG).apply {
        xfermode = PorterDuffXfermode(PorterDuff.Mode.CLEAR)
    }

    private val cornerPaint = Paint(Paint.ANTI_ALIAS_FLAG).apply {
        color = ContextCompat.getColor(context, R.color.scanner_laser)
        strokeWidth = 8f
        style = Paint.Style.STROKE
        strokeCap = Paint.Cap.ROUND
    }

    private val laserPaint = Paint(Paint.ANTI_ALIAS_FLAG).apply {
        color = ContextCompat.getColor(context, R.color.scanner_laser)
        strokeWidth = 5f
        style = Paint.Style.STROKE
    }

    private val boxRect = RectF()
    private val cornerLength = 40f
    private val cornerRadius = 24f

    private var laserY = 0f
    private var laserAnimator: ValueAnimator? = null

    override fun onSizeChanged(w: Int, h: Int, oldw: Int, oldh: Int) {
        super.onSizeChanged(w, h, oldw, oldh)
        val boxWidth = w * 0.75f
        val boxHeight = boxWidth * 0.65f

        val left = (w - boxWidth) / 2f
        val top = (h - boxHeight) / 2f
        val right = left + boxWidth
        val bottom = top + boxHeight

        boxRect.set(left, top, right, bottom)
        startLaserAnimation(top, bottom)
    }

    private fun startLaserAnimation(top: Float, bottom: Float) {
        laserAnimator?.cancel()
        laserAnimator = ValueAnimator.ofFloat(top, bottom).apply {
            duration = 1800
            repeatMode = ValueAnimator.REVERSE
            repeatCount = ValueAnimator.INFINITE
            addUpdateListener {
                laserY = it.animatedValue as Float
                invalidate()
            }
            start()
        }
    }

    override fun onDraw(canvas: Canvas) {
        super.onDraw(canvas)

        // Draw semi-transparent scrim with transparent hole
        val layerId = canvas.saveLayer(0f, 0f, width.toFloat(), height.toFloat(), null)
        canvas.drawRect(0f, 0f, width.toFloat(), height.toFloat(), scrimPaint)
        canvas.drawRoundRect(boxRect, cornerRadius, cornerRadius, eraserPaint)
        canvas.restoreToCount(layerId)

        // Draw 4 corner targeting brackets
        // Top-Left
        canvas.drawLine(boxRect.left, boxRect.top + cornerLength, boxRect.left, boxRect.top + cornerRadius, cornerPaint)
        canvas.drawLine(boxRect.left + cornerRadius, boxRect.top, boxRect.left + cornerLength, boxRect.top, cornerPaint)
        // Top-Right
        canvas.drawLine(boxRect.right, boxRect.top + cornerLength, boxRect.right, boxRect.top + cornerRadius, cornerPaint)
        canvas.drawLine(boxRect.right - cornerLength, boxRect.top, boxRect.right - cornerRadius, boxRect.top, cornerPaint)
        // Bottom-Left
        canvas.drawLine(boxRect.left, boxRect.bottom - cornerLength, boxRect.left, boxRect.bottom - cornerRadius, cornerPaint)
        canvas.drawLine(boxRect.left + cornerRadius, boxRect.bottom, boxRect.left + cornerLength, boxRect.bottom, cornerPaint)
        // Bottom-Right
        canvas.drawLine(boxRect.right, boxRect.bottom - cornerLength, boxRect.right, boxRect.bottom - cornerRadius, cornerPaint)
        canvas.drawLine(boxRect.right - cornerLength, boxRect.bottom, boxRect.right - cornerRadius, boxRect.bottom, cornerPaint)

        // Draw animated laser scanning line
        if (laserY in boxRect.top..boxRect.bottom) {
            canvas.drawLine(boxRect.left + 8f, laserY, boxRect.right - 8f, laserY, laserPaint)
        }
    }

    override fun onDetachedFromWindow() {
        super.onDetachedFromWindow()
        laserAnimator?.cancel()
    }
}
