import React, { useState, useEffect, useRef } from 'react'
import { 
  ArrowLeft, Play, Pause, SkipForward, RotateCcw, Shuffle, Sparkles, Check, AlertTriangle, Eye, Terminal, Code, Cpu, Lightbulb
} from 'lucide-react'
import { getEditorialForProblem } from '../utils/editorialGenerator.js'

export default function VisualizerPage({ problem, onBack }) {
  const probName = problem?.name || 'Algorithm Visualizer'
  const ed = getEditorialForProblem(problem || { name: probName, topic: 'Arrays', difficulty: 'Easy' })

  // Active Approach Toggle: 'brute' vs 'optimal'
  const [activeApproach, setActiveApproach] = useState('brute')
  
  // Code Language: 'cpp' | 'java' | 'python'
  const [selectedLang, setSelectedLang] = useState('cpp')

  // Custom Input States
  const [inputArrayStr, setInputArrayStr] = useState(() => {
    const nameLower = probName.toLowerCase()
    if (nameLower.includes('index')) return '10, 20, 30, 40, 50'
    if (nameLower.includes('min and max')) return '5, 2, 9, 1, 7'
    if (nameLower.includes('sum of array')) return '1, 2, 3, 4, 5'
    if (nameLower.includes('sorted') && !nameLower.includes('duplicate')) return '1, 2, 5, 4, 6'
    if (nameLower.includes('alternate')) return '10, 20, 30, 40, 50'
    if (nameLower.includes('duplicate')) return '1, 1, 2, 2, 3, 4, 4'
    if (nameLower.includes('second largest')) return '12, 35, 1, 10, 34, 1'
    if (nameLower.includes('reverse')) return '1, 2, 3, 4, 5'
    if (nameLower.includes('missing')) return '1, 2, 4, 5, 6'
    return '10, 20, 30, 40, 50'
  })

  const [targetK, setTargetK] = useState(2) // For Find Element at Index / Missing N
  const [digitsInput, setDigitsInput] = useState(1234) // For Sum of Digits

  // Parsed Array
  const [arr, setArr] = useState([10, 20, 30, 40, 50])
  const [steps, setSteps] = useState([])
  const [currentStepIndex, setCurrentStepIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [speedMs, setSpeedMs] = useState(800)

  const timerRef = useRef(null)

  // Parse input array whenever inputArrayStr changes
  useEffect(() => {
    if (probName.toLowerCase().includes('sum of digits')) return
    const parsed = inputArrayStr
      .split(',')
      .map(s => parseInt(s.trim(), 10))
      .filter(n => !isNaN(n))
    
    if (parsed.length > 0) {
      setArr(parsed)
    }
  }, [inputArrayStr, probName])

  // Generate Simulation Steps whenever arr, targetK, digitsInput, or activeApproach changes
  useEffect(() => {
    const generatedSteps = []
    const nameLower = probName.toLowerCase()
    const isOptimal = activeApproach === 'optimal'

    // 1. FIND ELEMENT AT INDEX
    if (nameLower.includes('index')) {
      if (!isOptimal) {
        generatedSteps.push({
          activeIdx: -1,
          codeLine: 8,
          statusText: `Initialized Brute Force Iterative Scan. Target index K = ${targetK}`,
          terminalLog: `[INIT] Target K = ${targetK}, Array Size N = ${arr.length}`,
          type: 'start'
        })

        if (targetK < 0 || targetK >= arr.length) {
          generatedSteps.push({
            activeIdx: -1,
            codeLine: 9,
            statusText: `Boundary Check Failed! Index K = ${targetK} is out of bounds.`,
            terminalLog: `[ERROR] Invalid index K = ${targetK}. Returning -1.`,
            type: 'error'
          })
        } else {
          for (let i = 0; i < arr.length; i++) {
            if (i === targetK) {
              generatedSteps.push({
                activeIdx: i,
                codeLine: 15,
                statusText: `Match Found! Counter i = ${i} equals target K (${targetK}). arr[${i}] = ${arr[i]}`,
                terminalLog: `[SUCCESS] i (${i}) == K (${targetK}). Found element ${arr[i]} at index ${i}.`,
                type: 'found'
              })
              break
            } else {
              generatedSteps.push({
                activeIdx: i,
                codeLine: 14,
                statusText: `Scanning arr[${i}] = ${arr[i]}. Index i (${i}) != K (${targetK}). Incrementing i...`,
                terminalLog: `[LOOP] i = ${i}, arr[${i}] = ${arr[i]} != K (${targetK}).`,
                type: 'scanning'
              })
            }
          }
        }
      } else {
        generatedSteps.push({
          activeIdx: -1,
          codeLine: 7,
          statusText: `Initialized Optimal Approach: Computing RAM address offset Base + (K * size).`,
          terminalLog: `[OPTIMAL INIT] Calculating memory pointer for index K = ${targetK}`,
          type: 'start'
        })

        if (targetK < 0 || targetK >= arr.length) {
          generatedSteps.push({
            activeIdx: -1,
            codeLine: 8,
            statusText: `Out of bounds pointer check failed for index K = ${targetK}.`,
            terminalLog: `[ERROR] Index K = ${targetK} out of bounds.`,
            type: 'error'
          })
        } else {
          generatedSteps.push({
            activeIdx: targetK,
            codeLine: 11,
            statusText: `Direct O(1) Access! Fetched arr[${targetK}] = ${arr[targetK]} in constant time.`,
            terminalLog: `[O(1) SUCCESS] Direct lookup arr[${targetK}] = ${arr[targetK]}.`,
            type: 'found'
          })
        }
      }
    } 
    // 2. MIN AND MAX IN ARRAY
    else if (nameLower.includes('min and max')) {
      let minV = arr[0]
      let maxV = arr[0]
      let minIdx = 0
      let maxIdx = 0

      generatedSteps.push({
        activeIdx: 0,
        minIdx: 0,
        maxIdx: 0,
        minV,
        maxV,
        codeLine: 10,
        statusText: `Initialized: Setting minVal = arr[0] (${minV}) and maxVal = arr[0] (${maxV})`,
        terminalLog: `[INIT] minVal = ${minV}, maxVal = ${maxV}`,
        type: 'start'
      })

      for (let i = 1; i < arr.length; i++) {
        const val = arr[i]
        let actionMsg = `Scanning arr[${i}] = ${val}.`
        let logText = `[STEP ${i}] arr[${i}] = ${val}.`

        if (val < minV) {
          minV = val
          minIdx = i
          actionMsg += ` New MINIMUM found: ${val}!`
          logText += ` Updated minVal = ${val}.`
        }
        if (val > maxV) {
          maxV = val
          maxIdx = i
          actionMsg += ` New MAXIMUM found: ${val}!`
          logText += ` Updated maxVal = ${val}.`
        }

        generatedSteps.push({
          activeIdx: i,
          minIdx,
          maxIdx,
          minV,
          maxV,
          codeLine: 15,
          statusText: actionMsg,
          terminalLog: logText,
          type: 'scanning'
        })
      }

      generatedSteps.push({
        activeIdx: -1,
        minIdx,
        maxIdx,
        minV,
        maxV,
        codeLine: 18,
        statusText: `Scan Complete! Final Minimum = ${minV}, Final Maximum = ${maxV}`,
        terminalLog: `[DONE] Min = ${minV}, Max = ${maxV}`,
        type: 'found'
      })
    } 
    // 3. SUM OF ARRAY
    else if (nameLower.includes('sum of array')) {
      let total = 0
      generatedSteps.push({
        activeIdx: -1,
        currentSum: 0,
        codeLine: 7,
        statusText: `Initialized accumulator variable totalSum = 0`,
        terminalLog: `[INIT] totalSum = 0`,
        type: 'start'
      })

      for (let i = 0; i < arr.length; i++) {
        total += arr[i]
        generatedSteps.push({
          activeIdx: i,
          currentSum: total,
          codeLine: 11,
          statusText: `Adding arr[${i}] (${arr[i]}) to totalSum -> New totalSum = ${total}`,
          terminalLog: `[ADD] totalSum += arr[${i}] (${arr[i]}) -> totalSum = ${total}`,
          type: 'scanning'
        })
      }

      generatedSteps.push({
        activeIdx: -1,
        currentSum: total,
        codeLine: 14,
        statusText: `Completed Traversal! Final Accumulated Sum = ${total}`,
        terminalLog: `[DONE] Total Sum = ${total}`,
        type: 'found'
      })
    } 
    // 4. SUM OF DIGITS
    else if (nameLower.includes('sum of digits')) {
      let temp = Math.abs(digitsInput)
      let sum = 0
      const digitsList = String(temp).split('').map(Number)

      generatedSteps.push({
        activeDigitIdx: -1,
        currentSum: 0,
        remainingN: temp,
        codeLine: 7,
        statusText: `Initialized N = ${temp}, sum = 0`,
        terminalLog: `[INIT] N = ${temp}, sum = 0`,
        type: 'start'
      })

      for (let i = 0; i < digitsList.length; i++) {
        const lastD = digitsList[digitsList.length - 1 - i]
        sum += lastD
        temp = Math.floor(temp / 10)

        generatedSteps.push({
          activeDigitIdx: digitsList.length - 1 - i,
          currentSum: sum,
          remainingN: temp,
          extractedDigit: lastD,
          codeLine: 12,
          statusText: `Extracted last digit (${lastD}) via N % 10. Added to sum -> Sum = ${sum}. N becomes ${temp}`,
          terminalLog: `[MODULO] Extracted ${lastD}. sum = ${sum}, N = ${temp}`,
          type: 'scanning'
        })
      }

      generatedSteps.push({
        activeDigitIdx: -1,
        currentSum: sum,
        remainingN: 0,
        codeLine: 15,
        statusText: `All digits processed! Final Sum of Digits = ${sum}`,
        terminalLog: `[DONE] Final Sum of Digits = ${sum}`,
        type: 'found'
      })
    } 
    // 5. CHECK IF ARRAY IS SORTED
    else if (nameLower.includes('sorted') && !nameLower.includes('duplicate')) {
      generatedSteps.push({
        activeIdx: 0,
        compareIdx: -1,
        isSortedSoFar: true,
        codeLine: 7,
        statusText: `Starting sorted check for array of size ${arr.length}...`,
        terminalLog: `[INIT] Starting adjacent comparisons...`,
        type: 'start'
      })

      let sorted = true
      for (let i = 1; i < arr.length; i++) {
        const prev = arr[i - 1]
        const curr = arr[i]

        if (curr < prev) {
          sorted = false
          generatedSteps.push({
            activeIdx: i,
            compareIdx: i - 1,
            isSortedSoFar: false,
            codeLine: 9,
            statusText: `Violation Found! arr[${i}] (${curr}) < arr[${i-1}] (${prev}). Array is NOT sorted!`,
            terminalLog: `[VIOLATION] arr[${i}] (${curr}) < arr[${i-1}] (${prev}) -> Return false!`,
            type: 'error'
          })
          break
        } else {
          generatedSteps.push({
            activeIdx: i,
            compareIdx: i - 1,
            isSortedSoFar: true,
            codeLine: 8,
            statusText: `Valid! arr[${i}] (${curr}) >= arr[${i-1}] (${prev}). Order maintained.`,
            terminalLog: `[VALID] arr[${i}] (${curr}) >= arr[${i-1}] (${prev}).`,
            type: 'scanning'
          })
        }
      }

      if (sorted) {
        generatedSteps.push({
          activeIdx: -1,
          compareIdx: -1,
          isSortedSoFar: true,
          codeLine: 12,
          statusText: `Array is 100% SORTED in non-decreasing order!`,
          terminalLog: `[DONE] Array is sorted -> Return true!`,
          type: 'found'
        })
      }
    }
    // 6. ALTERNATES IN ARRAY
    else if (nameLower.includes('alternate')) {
      if (!isOptimal) {
        // Brute Force: Full Scan with % 2
        generatedSteps.push({
          activeIdx: -1,
          collected: [],
          codeLine: 7,
          statusText: `Initialized Brute Force Full Scan. Checking every index i % 2 == 0...`,
          terminalLog: `[INIT] Full scan over array size N = ${arr.length}`,
          type: 'start'
        })

        const collected = []
        for (let i = 0; i < arr.length; i++) {
          if (i % 2 === 0) {
            collected.push(arr[i])
            generatedSteps.push({
              activeIdx: i,
              collected: [...collected],
              codeLine: 10,
              statusText: `Index i = ${i} is EVEN (0 % 2 == 0). Extracted arr[${i}] = ${arr[i]}`,
              terminalLog: `[EVEN MATCH] i = ${i}, added ${arr[i]} to result list.`,
              type: 'found'
            })
          } else {
            generatedSteps.push({
              activeIdx: i,
              collected: [...collected],
              codeLine: 9,
              statusText: `Index i = ${i} is ODD (1 % 2 != 0). Skipping arr[${i}] = ${arr[i]}.`,
              terminalLog: `[ODD SKIP] i = ${i}, skipped ${arr[i]}.`,
              type: 'scanning'
            })
          }
        }
      } else {
        // Optimal: Step-2 Striding (i += 2)
        generatedSteps.push({
          activeIdx: -1,
          collected: [],
          codeLine: 7,
          statusText: `Initialized Optimal Step-2 Striding: Jumping directly i += 2 (0, 2, 4...).`,
          terminalLog: `[OPTIMAL INIT] Striding by 2 steps directly.`,
          type: 'start'
        })

        const collected = []
        for (let i = 0; i < arr.length; i += 2) {
          collected.push(arr[i])
          generatedSteps.push({
            activeIdx: i,
            collected: [...collected],
            codeLine: 9,
            statusText: `Stride Step: Visiting index i = ${i} directly. Extracted arr[${i}] = ${arr[i]}`,
            terminalLog: `[STRIDE i=${i}] Extracted ${arr[i]}. Next jump -> i = ${i+2}`,
            type: 'found'
          })
        }
      }
    }
    // 7. REMOVE DUPLICATES FROM ARRAY
    else if (nameLower.includes('duplicate')) {
      if (!isOptimal) {
        // Brute Force: HashSet
        const setVal = Array.from(new Set(arr))
        generatedSteps.push({
          activeIdx: -1,
          uniqueList: setVal,
          codeLine: 7,
          statusText: `Inserted all elements into Set. Unique elements count K = ${setVal.length}`,
          terminalLog: `[HASHSET] Filtered unique elements: [${setVal.join(', ')}]`,
          type: 'found'
        })
      } else {
        // Optimal: Two Pointers i and j
        let i = 0
        const tempArr = [...arr]

        generatedSteps.push({
          activeIdx: 0,
          compareIdx: 1,
          uniqueCount: 1,
          codeLine: 8,
          statusText: `Initialized Two Pointers: i = 0 (arr[0] = ${arr[0]}), scanning pointer j = 1...`,
          terminalLog: `[TWO POINTERS INIT] i = 0, j = 1`,
          type: 'start'
        })

        for (let j = 1; j < tempArr.length; j++) {
          if (tempArr[j] !== tempArr[i]) {
            i++
            tempArr[i] = tempArr[j]
            generatedSteps.push({
              activeIdx: i,
              compareIdx: j,
              uniqueCount: i + 1,
              codeLine: 12,
              statusText: `New Unique Element Found! arr[${j}] (${tempArr[j]}) != arr[${i-1}]. Placed at arr[${i}] = ${tempArr[j]}`,
              terminalLog: `[UNIQUE FOUND] Moved ${tempArr[j]} to arr[${i}]. Total unique = ${i+1}`,
              type: 'found'
            })
          } else {
            generatedSteps.push({
              activeIdx: i,
              compareIdx: j,
              uniqueCount: i + 1,
              codeLine: 10,
              statusText: `Duplicate Found! arr[${j}] (${tempArr[j]}) equals arr[${i}] (${tempArr[i]}). Skipping pointer j...`,
              terminalLog: `[DUPLICATE SKIP] j = ${j} (${tempArr[j]}) == arr[${i}].`,
              type: 'scanning'
            })
          }
        }

        generatedSteps.push({
          activeIdx: i,
          compareIdx: -1,
          uniqueCount: i + 1,
          codeLine: 16,
          statusText: `Duplicates Removed In-Place! Total Unique Elements K = ${i + 1}`,
          terminalLog: `[DONE] Unique Count K = ${i + 1}`,
          type: 'found'
        })
      }
    }
    // 8. SECOND LARGEST IN ARRAY
    else if (nameLower.includes('second largest')) {
      let largest = -1
      let secondLargest = -1

      generatedSteps.push({
        activeIdx: -1,
        largest,
        secondLargest,
        codeLine: 7,
        statusText: `Initialized: largest = -1, secondLargest = -1`,
        terminalLog: `[INIT] largest = -1, secondLargest = -1`,
        type: 'start'
      })

      for (let idx = 0; idx < arr.length; idx++) {
        const num = arr[idx]
        let logMsg = `[STEP ${idx}] arr[${idx}] = ${num}.`

        if (num > largest) {
          secondLargest = largest
          largest = num
          logMsg += ` Updated largest = ${largest}, secondLargest = ${secondLargest}.`
        } else if (num > secondLargest && num !== largest) {
          secondLargest = num
          logMsg += ` Updated secondLargest = ${secondLargest}.`
        }

        generatedSteps.push({
          activeIdx: idx,
          largest,
          secondLargest,
          codeLine: 12,
          statusText: `Scanning arr[${idx}] = ${num}. Current Largest = ${largest}, Second Largest = ${secondLargest}`,
          terminalLog: logMsg,
          type: 'scanning'
        })
      }

      generatedSteps.push({
        activeIdx: -1,
        largest,
        secondLargest,
        codeLine: 16,
        statusText: `Scan Complete! Final Second Largest Element = ${secondLargest}`,
        terminalLog: `[DONE] Second Largest = ${secondLargest}`,
        type: 'found'
      })
    }
    // 9. REVERSE AN ARRAY
    else if (nameLower.includes('reverse')) {
      if (!isOptimal) {
        // Brute Force: Temp Array
        const tempArr = [...arr].reverse()
        generatedSteps.push({
          activeIdx: -1,
          codeLine: 8,
          statusText: `Copied array backwards into temporary storage: [${tempArr.join(', ')}]`,
          terminalLog: `[TEMP ARRAY] Reversed copy created.`,
          type: 'found'
        })
      } else {
        // Optimal: Two Pointers Left & Right Swap
        let left = 0
        let right = arr.length - 1
        const tempArr = [...arr]

        generatedSteps.push({
          leftIdx: left,
          rightIdx: right,
          codeLine: 8,
          statusText: `Initialized Two Pointers: left = 0 (arr[0] = ${tempArr[left]}), right = ${right} (arr[${right}] = ${tempArr[right]})`,
          terminalLog: `[SWAP INIT] left = 0, right = ${right}`,
          type: 'start'
        })

        while (left < right) {
          const t = tempArr[left]
          tempArr[left] = tempArr[right]
          tempArr[right] = t

          generatedSteps.push({
            leftIdx: left,
            rightIdx: right,
            codeLine: 10,
            statusText: `Swapped arr[${left}] (${t}) and arr[${right}] (${tempArr[left]}). Incrementing left++, decrementing right--`,
            terminalLog: `[SWAP] arr[${left}] <-> arr[${right}]. Array state: [${tempArr.join(', ')}]`,
            type: 'scanning'
          })

          left++
          right--
        }

        generatedSteps.push({
          leftIdx: left,
          rightIdx: right,
          codeLine: 14,
          statusText: `Array Reverse Complete In-Place! Final Reversed Array: [${tempArr.join(', ')}]`,
          terminalLog: `[DONE] Array reversed cleanly!`,
          type: 'found'
        })
      }
    }
    // 10. MISSING NUMBER
    else if (nameLower.includes('missing')) {
      const N = arr.length + 1
      const expectedSum = (N * (N + 1)) / 2
      let actualSum = 0

      generatedSteps.push({
        activeIdx: -1,
        actualSum: 0,
        expectedSum,
        codeLine: 7,
        statusText: `Initialized: Target Range [1..${N}]. Expected Sum = ${N} * ${N+1} / 2 = ${expectedSum}`,
        terminalLog: `[MATH FORMULA] expectedSum = ${expectedSum} for N = ${N}`,
        type: 'start'
      })

      for (let i = 0; i < arr.length; i++) {
        actualSum += arr[i]
        generatedSteps.push({
          activeIdx: i,
          actualSum,
          expectedSum,
          codeLine: 10,
          statusText: `Adding arr[${i}] (${arr[i]}) to actualSum -> New actualSum = ${actualSum}`,
          terminalLog: `[SUM] actualSum += arr[${i}] (${arr[i]}) -> actualSum = ${actualSum}`,
          type: 'scanning'
        })
      }

      const missing = expectedSum - actualSum
      generatedSteps.push({
        activeIdx: -1,
        actualSum,
        expectedSum,
        missingNumber: missing,
        codeLine: 12,
        statusText: `Calculated Missing Number: expectedSum (${expectedSum}) - actualSum (${actualSum}) = ${missing}!`,
        terminalLog: `[DONE] Missing Number = ${missing}!`,
        type: 'found'
      })
    } 
    else {
      // Fallback
      generatedSteps.push({
        activeIdx: 0,
        codeLine: 1,
        statusText: `Algorithm visualizer initialized. Click Play to start simulation.`,
        terminalLog: `[INIT] Visualizer ready.`,
        type: 'start'
      })
    }

    setSteps(generatedSteps)
    setCurrentStepIndex(0)
    setIsPlaying(false)
  }, [arr, targetK, digitsInput, probName, activeApproach])

  // Play / Pause timer effect
  useEffect(() => {
    if (isPlaying) {
      timerRef.current = setInterval(() => {
        setCurrentStepIndex(prev => {
          if (prev < steps.length - 1) {
            return prev + 1
          } else {
            setIsPlaying(false)
            return prev
          }
        })
      }, speedMs)
    } else {
      clearInterval(timerRef.current)
    }
    return () => clearInterval(timerRef.current)
  }, [isPlaying, steps.length, speedMs])

  const handleNextStep = () => {
    if (currentStepIndex < steps.length - 1) {
      setCurrentStepIndex(prev => prev + 1)
    }
  }

  const handleReset = () => {
    setIsPlaying(false)
    setCurrentStepIndex(0)
  }

  const handleRandomArray = () => {
    const randomVals = Array.from({ length: 6 }, () => Math.floor(Math.random() * 90) + 10)
    setInputArrayStr(randomVals.join(', '))
    if (probName.toLowerCase().includes('index')) {
      setTargetK(Math.floor(Math.random() * 6))
    }
  }

  const currentStep = steps[currentStepIndex] || { statusText: 'Initializing simulation...', type: 'start', codeLine: 1, terminalLog: '' }

  // Maximum value for array bar heights
  const maxArrVal = arr.length > 0 ? Math.max(...arr, 1) : 1

  // Code snippet to display
  const activeCodeSnippet = activeApproach === 'brute' 
    ? (ed?.brute?.code?.[selectedLang] || '// Code snippet')
    : (ed?.optimal?.code?.[selectedLang] || '// Code snippet')

  const codeLines = activeCodeSnippet.split('\n')

  // Approach Intuition Strategy Text
  const approachStrategy = activeApproach === 'brute'
    ? (ed?.brute?.algorithm?.hinglish || ed?.brute?.algorithm?.english || ed?.brute?.explanation)
    : (ed?.optimal?.algorithm?.hinglish || ed?.optimal?.algorithm?.english || ed?.optimal?.explanation)

  return (
    <div className="visualizer-page-container animate-fade" style={{ minHeight: '90vh', padding: '30px 0', background: '#090809', color: '#f8fafc' }}>
      <div className="container" style={{ maxWidth: '1200px' }}>
        
        {/* Top Navigation */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <button
            onClick={onBack}
            className="flex-center"
            style={{
              background: 'rgba(255,255,255,0.06)',
              color: '#06b6d4',
              border: '1px solid rgba(6, 182, 212, 0.3)',
              padding: '8px 18px',
              borderRadius: '10px',
              fontSize: '0.88rem',
              fontWeight: 800,
              cursor: 'pointer',
              gap: '8px'
            }}
          >
            <ArrowLeft size={18} />
            <span>Back to Master DSA Sheet</span>
          </button>

          <div className="flex-center" style={{ gap: '8px', background: 'rgba(6, 182, 212, 0.1)', color: '#06b6d4', padding: '6px 14px', borderRadius: '8px', border: '1px solid rgba(6, 182, 212, 0.25)', fontSize: '0.82rem', fontWeight: 800 }}>
            <Eye size={14} />
            <span>Interactive Algorithm Visualizer & Code Execution Workspace</span>
          </div>
        </div>

        {/* 📌 PROBLEM STATEMENT & EXAMPLE HEADER CARD */}
        <div style={{ background: '#120f10', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '16px', padding: '20px 24px', marginBottom: '16px' }}>
          <h1 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#fff', margin: '0 0 8px 0' }}>
            {ed.title} <span style={{ fontSize: '0.8rem', fontWeight: 800, color: ed.difficulty === 'Easy' ? '#10b981' : '#f59e0b', background: 'rgba(255,255,255,0.06)', padding: '4px 10px', borderRadius: '6px', marginLeft: '10px' }}>{ed.difficulty}</span>
          </h1>
          <p style={{ color: '#cbd5e1', fontSize: '0.92rem', lineHeight: 1.6, margin: '0 0 14px 0' }}>
            <strong style={{ color: '#06b6d4' }}>Problem Description: </strong> {ed.problemStatement}
          </p>

          {ed.examples && ed.examples.length > 0 && (
            <div style={{ background: '#0a0809', padding: '12px 18px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.06)', fontSize: '0.85rem', fontFamily: 'var(--font-mono)' }}>
              <span style={{ color: '#06b6d4', fontWeight: 800 }}>Sample Input: </span> <span style={{ color: '#fff' }}>{ed.examples[0].input}</span> | <span style={{ color: '#10b981', fontWeight: 800 }}>Output: </span> <span style={{ color: '#fff' }}>{ed.examples[0].output}</span>
              <div style={{ color: '#94a3b8', fontSize: '0.8rem', marginTop: '4px', fontFamily: 'inherit' }}><strong>Explanation: </strong>{ed.examples[0].explanation}</div>
            </div>
          )}
        </div>

        {/* 💡 APPROACH EXPLANATION CARD BELOW QUESTION HEADER */}
        <div style={{ background: '#161214', border: `1px solid ${activeApproach === 'brute' ? 'rgba(234, 88, 12, 0.3)' : 'rgba(6, 182, 212, 0.3)'}`, borderRadius: '14px', padding: '18px 24px', marginBottom: '20px' }}>
          <div className="flex-center" style={{ justifyContent: 'flex-start', gap: '10px', marginBottom: '8px' }}>
            <Lightbulb size={18} color={activeApproach === 'brute' ? '#ea580c' : '#06b6d4'} />
            <span style={{ fontSize: '0.95rem', fontWeight: 800, color: activeApproach === 'brute' ? '#ea580c' : '#06b6d4' }}>
              How {activeApproach === 'brute' ? 'Brute Force' : 'Optimal'} Strategy Solves This Problem (Intuition & Steps):
            </span>
          </div>

          <pre style={{ margin: 0, color: '#e2e8f0', fontSize: '0.88rem', lineHeight: 1.6, whiteSpace: 'pre-wrap', fontFamily: 'inherit' }}>
            {approachStrategy}
          </pre>
        </div>

        {/* APPROACH SWITCHER & LANGUAGE SELECTOR */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
          
          {/* Approach Toggle [ Brute Force | Optimal ] */}
          <div style={{ background: '#161213', padding: '4px', borderRadius: '10px', display: 'flex', gap: '6px', border: '1px solid rgba(255,255,255,0.08)' }}>
            <button
              onClick={() => setActiveApproach('brute')}
              style={{
                padding: '8px 20px',
                borderRadius: '8px',
                fontSize: '0.85rem',
                fontWeight: 800,
                border: 'none',
                cursor: 'pointer',
                background: activeApproach === 'brute' ? '#ea580c' : 'transparent',
                color: activeApproach === 'brute' ? '#fff' : '#94a3b8',
                transition: 'all 0.2s ease'
              }}
            >
              Brute Force Approach
            </button>
            <button
              onClick={() => setActiveApproach('optimal')}
              style={{
                padding: '8px 20px',
                borderRadius: '8px',
                fontSize: '0.85rem',
                fontWeight: 800,
                border: 'none',
                cursor: 'pointer',
                background: activeApproach === 'optimal' ? '#06b6d4' : 'transparent',
                color: activeApproach === 'optimal' ? '#000' : '#94a3b8',
                transition: 'all 0.2s ease'
              }}
            >
              Optimal Approach
            </button>
          </div>

          {/* Language Selector [ C++ | Java | Python ] */}
          <div style={{ display: 'flex', gap: '6px' }}>
            {['cpp', 'java', 'python'].map((lang) => (
              <button
                key={lang}
                onClick={() => setSelectedLang(lang)}
                style={{
                  padding: '6px 14px',
                  borderRadius: '6px',
                  fontSize: '0.78rem',
                  fontWeight: 800,
                  border: 'none',
                  cursor: 'pointer',
                  background: selectedLang === lang ? 'rgba(255,255,255,0.15)' : 'rgba(255,255,255,0.04)',
                  color: selectedLang === lang ? '#06b6d4' : '#94a3b8',
                  textTransform: 'uppercase'
                }}
              >
                {lang === 'cpp' ? 'C++' : lang === 'java' ? 'Java' : 'Python'}
              </button>
            ))}
          </div>

        </div>

        {/* MAIN VISUALIZER WORKSPACE GRID: CANVAS (LEFT) + CODE EXECUTION HIGHLIGHTER (RIGHT) */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 440px', gap: '20px', marginBottom: '20px' }}>
          
          {/* LEFT COLUMN: CONTROL PANEL & ANIMATED CANVAS */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            
            {/* Input Controls */}
            <div style={{ background: '#120f10', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '14px', padding: '18px 20px' }}>
              <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
                
                <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
                  {!probName.toLowerCase().includes('sum of digits') ? (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                      <label style={{ fontSize: '0.75rem', fontWeight: 700, color: '#94a3b8' }}>Custom Array:</label>
                      <input
                        type="text"
                        value={inputArrayStr}
                        onChange={(e) => setInputArrayStr(e.target.value)}
                        style={{ background: '#181415', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '8px', padding: '6px 12px', color: '#fff', fontSize: '0.85rem', width: '220px', outline: 'none' }}
                      />
                    </div>
                  ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                      <label style={{ fontSize: '0.75rem', fontWeight: 700, color: '#94a3b8' }}>Custom Integer N:</label>
                      <input
                        type="number"
                        value={digitsInput}
                        onChange={(e) => setDigitsInput(parseInt(e.target.value, 10) || 0)}
                        style={{ background: '#181415', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '8px', padding: '6px 12px', color: '#fff', fontSize: '0.85rem', width: '130px', outline: 'none' }}
                      />
                    </div>
                  )}

                  {probName.toLowerCase().includes('index') && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                      <label style={{ fontSize: '0.75rem', fontWeight: 700, color: '#94a3b8' }}>Target Index K:</label>
                      <input
                        type="number"
                        value={targetK}
                        onChange={(e) => setTargetK(parseInt(e.target.value, 10) || 0)}
                        style={{ background: '#181415', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '8px', padding: '6px 12px', color: '#06b6d4', fontWeight: 800, fontSize: '0.85rem', width: '80px', outline: 'none' }}
                      />
                    </div>
                  )}

                  {!probName.toLowerCase().includes('sum of digits') && (
                    <button
                      onClick={handleRandomArray}
                      style={{ alignSelf: 'flex-end', background: 'rgba(255,255,255,0.06)', color: '#cbd5e1', border: '1px solid rgba(255,255,255,0.1)', padding: '7px 14px', borderRadius: '8px', fontSize: '0.78rem', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}
                    >
                      <Shuffle size={13} color="#06b6d4" />
                      <span>Random</span>
                    </button>
                  )}
                </div>

                {/* Simulation Actions */}
                <div className="flex-center" style={{ gap: '8px' }}>
                  <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    style={{
                      background: isPlaying ? '#ea580c' : '#10b981',
                      color: '#fff',
                      border: 'none',
                      padding: '8px 16px',
                      borderRadius: '8px',
                      fontSize: '0.82rem',
                      fontWeight: 800,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '5px'
                    }}
                  >
                    {isPlaying ? <Pause size={15} /> : <Play size={15} />}
                    <span>{isPlaying ? 'Pause' : 'Play'}</span>
                  </button>

                  <button
                    onClick={handleNextStep}
                    disabled={currentStepIndex >= steps.length - 1}
                    style={{ background: 'rgba(255,255,255,0.06)', color: '#fff', border: '1px solid rgba(255,255,255,0.1)', padding: '8px 12px', borderRadius: '8px', fontSize: '0.8rem', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', opacity: currentStepIndex >= steps.length - 1 ? 0.5 : 1 }}
                  >
                    <SkipForward size={15} />
                    <span>Next</span>
                  </button>

                  <button
                    onClick={handleReset}
                    style={{ background: 'rgba(255,255,255,0.06)', color: '#94a3b8', border: 'none', padding: '8px 12px', borderRadius: '8px', cursor: 'pointer' }}
                    title="Reset"
                  >
                    <RotateCcw size={15} />
                  </button>
                </div>

              </div>
            </div>

            {/* Step Action Banner */}
            <div style={{ background: currentStep.type === 'error' ? 'rgba(244,63,94,0.15)' : currentStep.type === 'found' ? 'rgba(16,185,129,0.15)' : '#161213', border: `1px solid ${currentStep.type === 'error' ? '#f43f5e' : currentStep.type === 'found' ? '#10b981' : 'rgba(6,182,212,0.3)'}`, borderRadius: '12px', padding: '14px 18px', display: 'flex', alignItems: 'center', gap: '12px' }}>
              <Sparkles size={18} color={currentStep.type === 'error' ? '#f43f5e' : currentStep.type === 'found' ? '#10b981' : '#06b6d4'} />
              <span style={{ fontSize: '0.88rem', fontWeight: 700, color: '#fff', lineHeight: 1.5 }}>
                {currentStep.statusText}
              </span>
            </div>

            {/* Animated Canvas */}
            {!probName.toLowerCase().includes('sum of digits') ? (
              <div style={{ background: '#120f10', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '16px', padding: '36px 20px', minHeight: '260px', display: 'flex', alignItems: 'flex-end', justifyContent: 'center', gap: '14px', position: 'relative' }}>
                {arr.map((val, idx) => {
                  const heightPx = Math.max(36, Math.round((val / maxArrVal) * 160))
                  
                  let barBg = '#1e1a1b'
                  let barBorder = 'rgba(255,255,255,0.1)'
                  let labelBadge = null

                  if (currentStep.activeIdx === idx || currentStep.leftIdx === idx) {
                    barBg = '#f59e0b'
                    barBorder = '#f59e0b'
                    labelBadge = 'Active'
                  }

                  if (currentStep.compareIdx === idx || currentStep.rightIdx === idx) {
                    barBg = '#06b6d4'
                    barBorder = '#06b6d4'
                    labelBadge = 'Compare/Right'
                  }

                  if (currentStep.minIdx === idx) {
                    barBg = '#10b981'
                    labelBadge = 'Min'
                  }

                  if (currentStep.maxIdx === idx) {
                    barBg = '#06b6d4'
                    labelBadge = 'Max'
                  }

                  if (currentStep.type === 'found' && (idx === targetK || probName.toLowerCase().includes('sorted') || probName.toLowerCase().includes('reverse') || probName.toLowerCase().includes('alternate'))) {
                    barBg = '#10b981'
                    barBorder = '#10b981'
                  }

                  if (currentStep.type === 'error' && (currentStep.activeIdx === idx || currentStep.compareIdx === idx)) {
                    barBg = '#f43f5e'
                    barBorder = '#f43f5e'
                  }

                  return (
                    <div key={idx} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
                      {labelBadge && (
                        <span style={{ fontSize: '0.68rem', fontWeight: 800, color: '#fff', background: barBg, padding: '2px 6px', borderRadius: '4px' }}>
                          {labelBadge}
                        </span>
                      )}

                      <div
                        style={{
                          width: '56px',
                          height: `${heightPx}px`,
                          background: barBg,
                          border: `2px solid ${barBorder}`,
                          borderRadius: '8px 8px 4px 4px',
                          display: 'flex',
                          alignItems: 'center',
                          justify: 'center',
                          fontWeight: 800,
                          fontSize: '1rem',
                          color: '#fff',
                          boxShadow: currentStep.activeIdx === idx ? '0 0 16px rgba(245, 158, 11, 0.6)' : 'none',
                          transition: 'all 0.3s ease'
                        }}
                      >
                        {val}
                      </div>

                      <span style={{ fontSize: '0.74rem', color: '#94a3b8', fontFamily: 'var(--font-mono)' }}>
                        idx {idx}
                      </span>
                    </div>
                  )
                })}
              </div>
            ) : (
              /* SUM OF DIGITS SPECIAL VISUALIZATION */
              <div style={{ background: '#120f10', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '16px', padding: '36px 20px', minHeight: '220px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '18px' }}>
                <div style={{ display: 'flex', gap: '12px' }}>
                  {String(Math.abs(digitsInput)).split('').map((d, idx) => {
                    const isActive = currentStep.activeDigitIdx === idx
                    return (
                      <div
                        key={idx}
                        style={{
                          width: '48px',
                          height: '54px',
                          borderRadius: '10px',
                          background: isActive ? '#06b6d4' : '#1e1a1b',
                          border: `2px solid ${isActive ? '#06b6d4' : 'rgba(255,255,255,0.1)'}`,
                          display: 'flex',
                          alignItems: 'center',
                          justify: 'center',
                          fontSize: '1.2rem',
                          fontWeight: 800,
                          color: isActive ? '#000' : '#fff',
                          boxShadow: isActive ? '0 0 16px rgba(6, 182, 212, 0.6)' : 'none',
                          transition: 'all 0.3s ease'
                        }}
                      >
                        {d}
                      </div>
                    )
                  })}
                </div>

                <div style={{ background: '#181415', padding: '10px 20px', borderRadius: '10px', border: '1px solid rgba(16, 185, 129, 0.3)', color: '#10b981', fontWeight: 800, fontSize: '1.1rem' }}>
                  Accumulated Digit Sum: {currentStep.currentSum || 0}
                </div>
              </div>
            )}

          </div>

          {/* RIGHT COLUMN: LIVE CODE EXECUTION HIGHLIGHTER */}
          <div style={{ background: '#0a0809', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '16px', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
            
            {/* Code Header */}
            <div style={{ padding: '12px 18px', background: '#141011', borderBottom: '1px solid rgba(255,255,255,0.06)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div className="flex-center" style={{ gap: '8px' }}>
                <Code size={16} color="#06b6d4" />
                <span style={{ fontSize: '0.85rem', fontWeight: 800, color: '#fff' }}>
                  {activeApproach === 'brute' ? 'Brute Force Code' : 'Optimal Code'} ({selectedLang.toUpperCase()})
                </span>
              </div>
              <span style={{ fontSize: '0.72rem', color: '#f59e0b', fontWeight: 800, background: 'rgba(245,158,11,0.15)', padding: '2px 8px', borderRadius: '4px', border: '1px solid rgba(245,158,11,0.3)' }}>
                ▶ Line {currentStep.codeLine || 1} Executing
              </span>
            </div>

            {/* Code Lines with Active Line Highlight & Pointer Badge */}
            <div style={{ padding: '12px 0', fontFamily: 'var(--font-mono)', fontSize: '0.8rem', lineHeight: 1.6, overflowX: 'auto', flex: 1, background: '#050404' }}>
              {codeLines.map((lineText, lineIdx) => {
                const lineNum = lineIdx + 1
                const isExecuting = currentStep.codeLine === lineNum

                return (
                  <div 
                    key={lineIdx}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      padding: '2px 16px',
                      background: isExecuting ? 'rgba(245, 158, 11, 0.25)' : 'transparent',
                      borderLeft: isExecuting ? '4px solid #f59e0b' : '4px solid transparent',
                      transition: 'background 0.2s ease'
                    }}
                  >
                    <span style={{ width: '30px', color: isExecuting ? '#f59e0b' : '#475569', userSelect: 'none', textAlign: 'right', marginRight: '14px', fontWeight: isExecuting ? 800 : 400 }}>
                      {lineNum}
                    </span>
                    <span style={{ color: isExecuting ? '#fff' : lineText.trim().startsWith('//') || lineText.trim().startsWith('#') ? '#10b981' : '#38bdf8', fontWeight: isExecuting ? 700 : 400, whiteSpace: 'pre', flex: 1 }}>
                      {lineText}
                    </span>
                    {isExecuting && (
                      <span style={{ fontSize: '0.68rem', fontWeight: 800, color: '#f59e0b', background: 'rgba(245, 158, 11, 0.3)', padding: '1px 6px', borderRadius: '4px', marginLeft: '8px' }}>
                        ▶ Executing
                      </span>
                    )}
                  </div>
                )
              })}
            </div>

          </div>

        </div>

        {/* 💻 EMBEDDED IDE TERMINAL / CONSOLE OUTPUT LOG */}
        <div style={{ background: '#050404', border: '1px solid rgba(6, 182, 212, 0.25)', borderRadius: '14px', overflow: 'hidden' }}>
          <div style={{ padding: '10px 18px', background: '#120f10', borderBottom: '1px solid rgba(255,255,255,0.06)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div className="flex-center" style={{ gap: '8px' }}>
              <Terminal size={15} color="#06b6d4" />
              <span style={{ fontSize: '0.82rem', fontWeight: 800, color: '#06b6d4' }}>
                KeetCode Live Terminal & Execution Console
              </span>
            </div>
            <span style={{ fontSize: '0.74rem', color: '#94a3b8' }}>stdout / variable tracker</span>
          </div>

          <div style={{ padding: '14px 18px', fontFamily: 'var(--font-mono)', fontSize: '0.82rem', color: '#10b981', minHeight: '80px', maxHeight: '140px', overflowY: 'auto', lineHeight: 1.65 }}>
            {steps.slice(0, currentStepIndex + 1).map((st, idx) => (
              <div key={idx} style={{ opacity: idx === currentStepIndex ? 1 : 0.6, color: st.type === 'error' ? '#f43f5e' : st.type === 'found' ? '#10b981' : '#38bdf8' }}>
                {st.terminalLog}
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}
