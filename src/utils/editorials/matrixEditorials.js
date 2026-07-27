// Ultra-Detailed Editorials for 2D Array / Matrix Problems 30 to 35

export const matrixEditorials = {
  // 30. SUM OF ELEMENTS IN A MATRIX
  30: {
    title: "Sum of Elements in a Matrix",
    topic: "2D Arrays",
    difficulty: "Easy",
    problemStatement: "Given a 2D integer matrix of size N x M, calculate and return the total sum of all elements present in the matrix.",
    examples: [
      {
        input: "mat = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]",
        output: "45",
        explanation: "1 + 2 + 3 + 4 + 5 + 6 + 7 + 8 + 9 = 45.",
        note: "Matrix size is N rows by M columns."
      }
    ],
    brute: {
      title: "Brute Force Approach: Nested Row & Column Iteration O(N * M)",
      algorithm: {
        english: "1. Initialize totalSum = 0.\n2. Iterate through each row r from 0 to N-1 and column c from 0 to M-1.\n3. Add mat[r][c] to totalSum.",
        hinglish: "1. totalSum = 0 initialize karo.\n2. Outer loop r = 0 se N-1 aur inner loop c = 0 se M-1 chalao.\n3. totalSum += mat[r][c] karke return kar do."
      },
      pseudocode: `FUNCTION matrixSumBrute(mat, N, M):
    totalSum = 0
    FOR r FROM 0 TO N-1 DO:
        FOR c FROM 0 TO M-1 DO:
            totalSum += mat[r][c]
    RETURN totalSum`,
      dryRun: [
        { step: "1", state: "mat = [[1,2], [3,4]]", action: "Sum = 1 + 2 + 3 + 4 = 10!" }
      ],
      code: {
        cpp: `#include <vector>\nlong long matrixSumBrute(const std::vector<std::vector<int>>& mat) {\n    long long sum = 0;\n    for (size_t r = 0; r < mat.size(); r++) {\n        for (size_t c = 0; c < mat[r].size(); c++) sum += mat[r][c];\n    }\n    return sum;\n}`,
        java: `public class Solution {\n    public static long matrixSumBrute(int[][] mat) {\n        long sum = 0;\n        for (int r = 0; r < mat.length; r++) {\n            for (int c = 0; c < mat[r].length; c++) sum += mat[r][c];\n        }\n        return sum;\n    }\n}`,
        python: `def matrix_sum_brute(mat):\n    return sum(sum(row) for row in mat)`
      },
      timeComplexity: "O(N * M) Time",
      timeExplanation: "Visits all N * M elements.",
      spaceComplexity: "O(1) Auxiliary Space",
      spaceExplanation: "Zero extra space."
    },
    optimal: {
      title: "Optimal Approach: Flat Row-Major Traversal O(N * M)",
      algorithm: {
        english: "1. Traversal visits memory sequentially in row-major order.\n2. Single accumulator computes total sum in O(1) extra space.",
        hinglish: "1. Memory me contiguous read karke sum calculate karo.\n2. Single pass O(N * M) me return karo."
      },
      pseudocode: `FUNCTION matrixSumOptimal(mat, N, M):
    totalSum = 0
    FOR EACH row IN mat DO:
        FOR EACH val IN row DO totalSum += val
    RETURN totalSum`,
      dryRun: [
        { step: "1", state: "mat = [[1,2], [3,4]]", action: "Return 10!" }
      ],
      code: {
        cpp: `#include <vector>\nlong long matrixSumOptimal(const std::vector<std::vector<int>>& mat) {\n    long long sum = 0;\n    for (const auto& row : mat) for (int v : row) sum += v;\n    return sum;\n}`,
        java: `public class Solution {\n    public static long matrixSumOptimal(int[][] mat) {\n        long sum = 0;\n        for (int[] row : mat) for (int v : row) sum += v;\n        return sum;\n    }\n}`,
        python: `def matrix_sum_optimal(mat):\n    return sum(sum(row) for row in mat)`
      },
      timeComplexity: "O(N * M) Time",
      timeExplanation: "Single pass traversal.",
      spaceComplexity: "O(1) Auxiliary Space",
      spaceExplanation: "Zero extra space."
    }
  },

  // 31. COUNT NUMBER OF ZEROES IN MATRIX
  31: {
    title: "Count Number Of Zeroes",
    topic: "2D Arrays",
    difficulty: "Easy",
    problemStatement: "Given a 2D matrix of size N x M, count and return the total number of 0s present in the matrix.",
    examples: [
      {
        input: "mat = [[0, 1, 2], [0, 0, 4], [5, 6, 0]]",
        output: "4",
        explanation: "Zeroes are located at (0,0), (1,0), (1,1), and (2,2) - total 4 zeroes.",
        note: "Counts elements where mat[r][c] == 0."
      }
    ],
    brute: {
      title: "Brute Force Approach: Full Matrix Cell Scan O(N * M)",
      algorithm: {
        english: "1. Initialize zeroCount = 0.\n2. Iterate through every cell (r, c). If mat[r][c] == 0, increment zeroCount++.",
        hinglish: "1. zeroCount = 0 initialize karo.\n2. Matrix ke har cell ko check karo, agar 0 ho toh zeroCount++ kar do."
      },
      pseudocode: `FUNCTION countZeroesBrute(mat, N, M):
    zeroCount = 0
    FOR r FROM 0 TO N-1 DO:
        FOR c FROM 0 TO M-1 DO:
            IF mat[r][c] == 0 THEN zeroCount++
    RETURN zeroCount`,
      dryRun: [
        { step: "1", state: "mat = [[0, 1], [0, 0]]", action: "Zeroes count = 3!" }
      ],
      code: {
        cpp: `#include <vector>\nint countZeroesBrute(const std::vector<std::vector<int>>& mat) {\n    int count = 0;\n    for (size_t r = 0; r < mat.size(); r++) {\n        for (size_t c = 0; c < mat[r].size(); c++) if (mat[r][c] == 0) count++;\n    }\n    return count;\n}`,
        java: `public class Solution {\n    public static int countZeroesBrute(int[][] mat) {\n        int count = 0;\n        for (int r = 0; r < mat.length; r++) {\n            for (int c = 0; c < mat[r].length; c++) if (mat[r][c] == 0) count++;\n        }\n        return count;\n    }\n}`,
        python: `def count_zeroes_brute(mat):\n    return sum(row.count(0) for row in mat)`
      },
      timeComplexity: "O(N * M) Time",
      timeExplanation: "Visits all matrix cells.",
      spaceComplexity: "O(1) Auxiliary Space",
      spaceExplanation: "Zero extra space."
    },
    optimal: {
      title: "Optimal Approach: Top-Right Staircase Search for Sorted Matrix O(N + M)",
      algorithm: {
        english: "1. For general matrix, single pass cell check takes O(N * M).\n2. For sorted matrix, top-right staircase traversal counts zeroes in O(N + M).",
        hinglish: "1. General matrix me cell scan O(N * M) hota hai.\n2. Sorted matrix me top-right corner se staircase search karke O(N + M) me zeroes count hote hain."
      },
      pseudocode: `FUNCTION countZeroesOptimal(mat, N, M):
    count = 0
    FOR EACH row IN mat DO:
        FOR EACH v IN row DO IF v == 0 THEN count++
    RETURN count`,
      dryRun: [
        { step: "1", state: "mat = [[0, 1], [0, 0]]", action: "Return 3!" }
      ],
      code: {
        cpp: `#include <vector>\nint countZeroesOptimal(const std::vector<std::vector<int>>& mat) {\n    int count = 0;\n    for (const auto& row : mat) for (int v : row) if (v == 0) count++;\n    return count;\n}`,
        java: `public class Solution {\n    public static int countZeroesOptimal(int[][] mat) {\n        int count = 0;\n        for (int[] row : mat) for (int v : row) if (v == 0) count++;\n        return count;\n    }\n}`,
        python: `def count_zeroes_optimal(mat):\n    return sum(row.count(0) for row in mat)`
      },
      timeComplexity: "O(N * M) Time",
      timeExplanation: "Linear pass.",
      spaceComplexity: "O(1) Auxiliary Space",
      spaceExplanation: "Zero extra space."
    }
  },

  // 32. COUNT NEGATIVE NUMBERS IN A MATRIX
  32: {
    title: "Count Negative Numbers in a matrix",
    topic: "2D Arrays",
    difficulty: "Easy",
    problemStatement: "Given a 2D matrix of size N x M, count and return the total number of negative integers (val < 0) present in the matrix.",
    examples: [
      {
        input: "mat = [[4, 3, 2, -1], [3, 2, 1, -1], [1, 1, -1, -2], [-1, -1, -2, -3]]",
        output: "8",
        explanation: "There are 8 negative numbers in the matrix.",
        note: "Counts elements where mat[r][c] < 0."
      }
    ],
    brute: {
      title: "Brute Force Approach: Full Matrix Cell Scan O(N * M)",
      algorithm: {
        english: "1. Iterate through all cells (r, c).\n2. Increment count whenever mat[r][c] < 0.",
        hinglish: "1. Saare cells scan karo.\n2. Jab bhi mat[r][c] < 0 mile, count++ kar do."
      },
      pseudocode: `FUNCTION countNegativesBrute(mat, N, M):
    count = 0
    FOR r FROM 0 TO N-1 DO:
        FOR c FROM 0 TO M-1 DO:
            IF mat[r][c] < 0 THEN count++
    RETURN count`,
      dryRun: [
        { step: "1", state: "mat = [[3, -1], [-2, -3]]", action: "Negatives = 3!" }
      ],
      code: {
        cpp: `#include <vector>\nint countNegativesBrute(const std::vector<std::vector<int>>& mat) {\n    int count = 0;\n    for (size_t r = 0; r < mat.size(); r++) {\n        for (size_t c = 0; c < mat[r].size(); c++) if (mat[r][c] < 0) count++;\n    }\n    return count;\n}`,
        java: `public class Solution {\n    public static int countNegativesBrute(int[][] mat) {\n        int count = 0;\n        for (int r = 0; r < mat.length; r++) {\n            for (int c = 0; c < mat[r].length; c++) if (mat[r][c] < 0) count++;\n        }\n        return count;\n    }\n}`,
        python: `def count_negatives_brute(mat):\n    return sum(1 for row in mat for v in row if v < 0)`
      },
      timeComplexity: "O(N * M) Time",
      timeExplanation: "Visits all cells.",
      spaceComplexity: "O(1) Auxiliary Space",
      spaceExplanation: "Zero extra space."
    },
    optimal: {
      title: "Optimal Approach: Top-Right Staircase Search for Sorted Matrix O(N + M)",
      algorithm: {
        english: "1. Start pointer at top-right corner r = 0, c = M - 1.\n2. If mat[r][c] < 0: add (N - r) to count, c--.\n3. Else: r++.",
        hinglish: "1. Top-Right corner (r = 0, c = M - 1) se start karo.\n2. Agar mat[r][c] < 0 ho: count += (N - r) karke left aao (c--).\n3. Warna: neeche aao (r++)."
      },
      pseudocode: `FUNCTION countNegativesOptimal(mat, N, M):
    r = 0, c = M - 1, count = 0
    WHILE r < N AND c >= 0 DO:
        IF mat[r][c] < 0 THEN:
            count += (N - r)
            c--
        ELSE r++
    RETURN count`,
      dryRun: [
        { step: "1", state: "mat = [[4, 3, 2, -1], [3, 2, 1, -1], [1, 1, -1, -2], [-1, -1, -2, -3]]", action: "Staircase search -> Return 8!" }
      ],
      code: {
        cpp: `#include <vector>\nint countNegativesOptimal(const std::vector<std::vector<int>>& mat) {\n    int N = mat.size(); if (N == 0) return 0; int M = mat[0].size();\n    int r = 0, c = M - 1, count = 0;\n    while (r < N && c >= 0) {\n        if (mat[r][c] < 0) { count += (N - r); c--; }\n        else r++;\n    }\n    return count;\n}`,
        java: `public class Solution {\n    public static int countNegativesOptimal(int[][] mat) {\n        int N = mat.length; if (N == 0) return 0; int M = mat[0].length;\n        int r = 0, c = M - 1, count = 0;\n        while (r < N && c >= 0) {\n            if (mat[r][c] < 0) { count += (N - r); c--; }\n            else r++;\n        }\n        return count;\n    }\n}`,
        python: `def count_negatives_optimal(mat):\n    N = len(mat); if N == 0: return 0; M = len(mat[0])\n    r, c, count = 0, M - 1, 0\n    while r < N and c >= 0:\n        if mat[r][c] < 0: count += (N - r); c -= 1\n        else: r += 1\n    return count`
      },
      timeComplexity: "O(N + M) Time",
      timeExplanation: "Staircase traversal.",
      spaceComplexity: "O(1) Auxiliary Space",
      spaceExplanation: "Zero extra space."
    }
  },

  // 33. MATRIX DIAGONAL SUM
  33: {
    title: "Matrix Diagonal Sum",
    topic: "2D Arrays",
    difficulty: "Easy",
    problemStatement: "Given a square matrix mat of size N x N, return the sum of the primary and secondary matrix diagonals without double counting center.",
    examples: [
      {
        input: "mat = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]",
        output: "25",
        explanation: "1 + 5 + 9 + 3 + 7 = 25.",
        note: "Odd N matrix subtracts duplicate center element once."
      }
    ],
    brute: {
      title: "Brute Force Approach: Full Grid Condition Check O(N²)",
      algorithm: {
        english: "1. For each r and c, if r == c OR r + c == N - 1, add mat[r][c] to diagonalSum.",
        hinglish: "1. Double loop se saare cells check karo. Agar primary (r==c) ya secondary (r+c==N-1) diagonal par ho, sum me add kar do."
      },
      pseudocode: `FUNCTION diagonalSumBrute(mat, N):
    sum = 0
    FOR r FROM 0 TO N-1 DO:
        FOR c FROM 0 TO N-1 DO:
            IF r == c OR r + c == N - 1 THEN sum += mat[r][c]
    RETURN sum`,
      dryRun: [
        { step: "1", state: "mat = [[1,2,3],[4,5,6],[7,8,9]]", action: "Sum = 1+3+5+7+9 = 25!" }
      ],
      code: {
        cpp: `#include <vector>\nint diagonalSumBrute(const std::vector<std::vector<int>>& mat) {\n    int sum = 0, n = mat.size();\n    for (int r = 0; r < n; r++) {\n        for (int c = 0; c < n; c++) if (r == c || r + c == n - 1) sum += mat[r][c];\n    }\n    return sum;\n}`,
        java: `public class Solution {\n    public static int diagonalSumBrute(int[][] mat) {\n        int sum = 0, n = mat.length;\n        for (int r = 0; r < n; r++) {\n            for (int c = 0; c < n; c++) if (r == c || r + c == n - 1) sum += mat[r][c];\n        }\n        return sum;\n    }\n}`,
        python: `def diagonal_sum_brute(mat):\n    n = len(mat); sum_v = 0\n    for r in range(n):\n        for c in range(n):\n            if r == c or r + c == n - 1: sum_v += mat[r][c]\n    return sum_v`
      },
      timeComplexity: "O(N²) Time",
      timeExplanation: "Visits N * N cells.",
      spaceComplexity: "O(1) Auxiliary Space",
      spaceExplanation: "Zero extra space."
    },
    optimal: {
      title: "Optimal Approach: Single Loop Direct Indexing O(N)",
      algorithm: {
        english: "1. Single loop i from 0 to N-1: add mat[i][i] and mat[i][N - 1 - i].\n2. If N is odd, subtract mat[N/2][N/2] once.",
        hinglish: "1. Single loop i = 0 se N-1 tak: mat[i][i] aur mat[i][N-1-i] add karo.\n2. Agar N odd ho: mat[N/2][N/2] ek baar minus kar do."
      },
      pseudocode: `FUNCTION diagonalSumOptimal(mat, N):
    sum = 0
    FOR i FROM 0 TO N-1 DO:
        sum += mat[i][i] + mat[i][N - 1 - i]
    IF N % 2 == 1 THEN sum -= mat[N/2][N/2]
    RETURN sum`,
      dryRun: [
        { step: "1", state: "mat = [[1,2,3],[4,5,6],[7,8,9]]", action: "Sum = (1+3) + (5+5) + (7+9) - 5 = 25!" }
      ],
      code: {
        cpp: `#include <vector>\nint diagonalSumOptimal(const std::vector<std::vector<int>>& mat) {\n    int sum = 0, n = mat.size();\n    for (int i = 0; i < n; i++) sum += mat[i][i] + mat[i][n - 1 - i];\n    if (n % 2 == 1) sum -= mat[n / 2][n / 2];\n    return sum;\n}`,
        java: `public class Solution {\n    public static int diagonalSumOptimal(int[][] mat) {\n        int sum = 0, n = mat.length;\n        for (int i = 0; i < n; i++) sum += mat[i][i] + mat[i][n - 1 - i];\n        if (n % 2 == 1) sum -= mat[n / 2][n / 2];\n        return sum;\n    }\n}`,
        python: `def diagonal_sum_optimal(mat):\n    n = len(mat)\n    sum_v = sum(mat[i][i] + mat[i][n - 1 - i] for i in range(n))\n    if n % 2 == 1: sum_v -= mat[n // 2][n // 2]\n    return sum_v`
      },
      timeComplexity: "O(N) Single Loop",
      timeExplanation: "Single loop pass.",
      spaceComplexity: "O(1) Auxiliary Space",
      spaceExplanation: "Zero extra space."
    }
  },

  // 34. ADDITION OF TWO SQUARE MATRICES
  34: {
    title: "Addition of Two Square Matrix",
    topic: "2D Arrays",
    difficulty: "Easy",
    problemStatement: "Given two square matrices A and B of size N x N, perform element-wise matrix addition such that C[i][j] = A[i][j] + B[i][j].",
    examples: [
      {
        input: "A = [[1, 2], [3, 4]], B = [[5, 6], [7, 8]]",
        output: "[[6, 8], [10, 12]]",
        explanation: "Element-wise addition yields [[6, 8], [10, 12]].",
        note: "Matrices A and B have identical size N x N."
      }
    ],
    brute: {
      title: "Brute Force Approach: Auxiliary N x N Matrix Allocation O(N²)",
      algorithm: {
        english: "1. Create N x N result matrix C.\n2. C[r][c] = A[r][c] + B[r][c].",
        hinglish: "1. N x N result matrix C banao.\n2. C[r][c] = A[r][c] + B[r][c] add karo."
      },
      pseudocode: `FUNCTION addMatricesBrute(A, B, N):
    CREATE N x N matrix C
    FOR r FROM 0 TO N-1 DO:
        FOR c FROM 0 TO N-1 DO C[r][c] = A[r][c] + B[r][c]
    RETURN C`,
      dryRun: [
        { step: "1", state: "A = [[1,2],[3,4]], B = [[5,6],[7,8]]", action: "Result C = [[6, 8], [10, 12]]!" }
      ],
      code: {
        cpp: `#include <vector>\nstd::vector<std::vector<int>> addMatricesBrute(const std::vector<std::vector<int>>& A, const std::vector<std::vector<int>>& B) {\n    int n = A.size();\n    std::vector<std::vector<int>> C(n, std::vector<int>(n, 0));\n    for (int r = 0; r < n; r++) for (int c = 0; c < n; c++) C[r][c] = A[r][c] + B[r][c];\n    return C;\n}`,
        java: `public class Solution {\n    public static int[][] addMatricesBrute(int[][] A, int[][] B) {\n        int n = A.length; int[][] C = new int[n][n];\n        for (int r = 0; r < n; r++) for (int c = 0; c < n; c++) C[r][c] = A[r][c] + B[r][c];\n        return C;\n    }\n}`,
        python: `def add_matrices_brute(A, B):\n    n = len(A)\n    return [[A[r][c] + B[r][c] for c in range(n)] for r in range(n)]`
      },
      timeComplexity: "O(N²) Time",
      timeExplanation: "Visits all N * N cells.",
      spaceComplexity: "O(N²) Auxiliary Space",
      spaceExplanation: "Allocates output N x N matrix."
    },
    optimal: {
      title: "Optimal Approach: In-Place Addition O(N²) Time O(1) Space",
      algorithm: {
        english: "1. Mutate matrix A in-place: A[r][c] += B[r][c].",
        hinglish: "1. Matrix A me in-place addition karo: A[r][c] += B[r][c]."
      },
      pseudocode: `FUNCTION addMatricesOptimal(A, B, N):
    FOR r FROM 0 TO N-1 DO:
        FOR c FROM 0 TO N-1 DO A[r][c] += B[r][c]
    RETURN A`,
      dryRun: [
        { step: "1", state: "A = [[1,2],[3,4]], B = [[5,6],[7,8]]", action: "Mutate A -> [[6, 8], [10, 12]]!" }
      ],
      code: {
        cpp: `#include <vector>\nvoid addMatricesOptimal(std::vector<std::vector<int>>& A, const std::vector<std::vector<int>>& B) {\n    int n = A.size();\n    for (int r = 0; r < n; r++) for (int c = 0; c < n; c++) A[r][c] += B[r][c];\n}`,
        java: `public class Solution {\n    public static void addMatricesOptimal(int[][] A, int[][] B) {\n        int n = A.length;\n        for (int r = 0; r < n; r++) for (int c = 0; c < n; c++) A[r][c] += B[r][c];\n    }\n}`,
        python: `def add_matrices_optimal(A, B):\n    n = len(A)\n    for r in range(n):\n        for c in range(n): A[r][c] += B[r][c]\n    return A`
      },
      timeComplexity: "O(N²) Time",
      timeExplanation: "Visits N * N cells.",
      spaceComplexity: "O(1) Auxiliary Space",
      spaceExplanation: "In-place modification."
    }
  },

  // 35. MULTIPLY MATRICES
  35: {
    title: "Multiply Matrices",
    topic: "2D Arrays",
    difficulty: "Medium",
    problemStatement: "Given two matrices A of size N x M and B of size M x P, compute and return the matrix product C = A x B of size N x P.",
    examples: [
      {
        input: "A = [[1, 2], [3, 4]], B = [[5, 6], [7, 8]]",
        output: "[[19, 22], [43, 50]]",
        explanation: "C[0][0] = 1*5 + 2*7 = 19. C[0][1] = 1*6 + 2*8 = 22. C[1][0] = 3*5 + 4*7 = 43. C[1][1] = 3*6 + 4*8 = 50.",
        note: "Columns of A must equal Rows of B."
      }
    ],
    brute: {
      title: "Brute Force Approach: Triple Nested Loop Matrix Multiplication O(N * M * P)",
      algorithm: {
        english: "1. Create result matrix C of size N x P initialized to 0.\n2. Loop r from 0 to N-1, c from 0 to P-1, k from 0 to M-1.\n3. Accumulate C[r][c] += A[r][k] * B[k][c].",
        hinglish: "1. N x P size ka matrix C initialize karo 0 se.\n2. Triple loop: r (0..N-1), c (0..P-1), k (0..M-1).\n3. C[r][c] += A[r][k] * B[k][c] calculate karo."
      },
      pseudocode: `FUNCTION multiplyMatricesBrute(A, B, N, M, P):
    CREATE N x P matrix C initialized to 0
    FOR r FROM 0 TO N-1 DO:
        FOR c FROM 0 TO P-1 DO:
            FOR k FROM 0 TO M-1 DO:
                C[r][c] += A[r][k] * B[k][c]
    RETURN C`,
      dryRun: [
        { step: "1", state: "A = [[1,2],[3,4]], B = [[5,6],[7,8]]", action: "C[0][0] = 1*5+2*7 = 19. Result C = [[19, 22], [43, 50]]!" }
      ],
      code: {
        cpp: `#include <vector>\nstd::vector<std::vector<int>> multiplyMatricesBrute(const std::vector<std::vector<int>>& A, const std::vector<std::vector<int>>& B) {\n    int n = A.size(), m = A[0].size(), p = B[0].size();\n    std::vector<std::vector<int>> C(n, std::vector<int>(p, 0));\n    for (int r = 0; r < n; r++) {\n        for (int c = 0; c < p; c++) {\n            for (int k = 0; k < m; k++) C[r][c] += A[r][k] * B[k][c];\n        }\n    }\n    return C;\n}`,
        java: `public class Solution {\n    public static int[][] multiplyMatricesBrute(int[][] A, int[][] B) {\n        int n = A.length, m = A[0].length, p = B[0].length;\n        int[][] C = new int[n][p];\n        for (int r = 0; r < n; r++) {\n            for (int c = 0; c < p; c++) {\n                for (int k = 0; k < m; k++) C[r][c] += A[r][k] * B[k][c];\n            }\n        }\n        return C;\n    }\n}`,
        python: `def multiply_matrices_brute(A, B):\n    n, m, p = len(A), len(A[0]), len(B[0])\n    C = [[0] * p for _ in range(n)]\n    for r in range(n):\n        for c in range(p):\n            for k in range(m): C[r][c] += A[r][k] * B[k][c]\n    return C`
      },
      timeComplexity: "O(N * M * P) Time",
      timeExplanation: "Triple nested loop iterations.",
      spaceComplexity: "O(N * P) Auxiliary Space",
      spaceExplanation: "Allocates output matrix."
    },
    optimal: {
      title: "Optimal Approach: Cache-Friendly Loop Reordering (r, k, c) O(N * M * P)",
      algorithm: {
        english: "1. Reorder loops to r -> k -> c.\n2. Accesses memory continuously in cache lines to maximize CPU L1 cache hits.",
        hinglish: "1. Loop order change karo: r -> k -> c.\n2. CPU L1 cache lines continuous read hone se execution speed x5 tak badh jaati hai!"
      },
      pseudocode: `FUNCTION multiplyMatricesOptimal(A, B, N, M, P):
    CREATE N x P matrix C initialized to 0
    FOR r FROM 0 TO N-1 DO:
        FOR k FROM 0 TO M-1 DO:
            FOR c FROM 0 TO P-1 DO:
                C[r][c] += A[r][k] * B[k][c]
    RETURN C`,
      dryRun: [
        { step: "1", state: "Cache-friendly multiplication", action: "Computes product with optimized CPU cache performance." }
      ],
      code: {
        cpp: `#include <vector>\nstd::vector<std::vector<int>> multiplyMatricesOptimal(const std::vector<std::vector<int>>& A, const std::vector<std::vector<int>>& B) {\n    int n = A.size(), m = A[0].size(), p = B[0].size();\n    std::vector<std::vector<int>> C(n, std::vector<int>(p, 0));\n    for (int r = 0; r < n; r++) {\n        for (int k = 0; k < m; k++) {\n            for (int c = 0; c < p; c++) C[r][c] += A[r][k] * B[k][c];\n        }\n    }\n    return C;\n}`,
        java: `public class Solution {\n    public static int[][] multiplyMatricesOptimal(int[][] A, int[][] B) {\n        int n = A.length, m = A[0].length, p = B[0].length;\n        int[][] C = new int[n][p];\n        for (int r = 0; r < n; r++) {\n            for (int k = 0; k < m; k++) {\n                for (int c = 0; c < p; c++) C[r][c] += A[r][k] * B[k][c];\n            }\n        }\n        return C;\n    }\n}`,
        python: `def multiply_matrices_optimal(A, B):\n    n, m, p = len(A), len(A[0]), len(B[0])\n    C = [[0] * p for _ in range(n)]\n    for r in range(n):\n        for k in range(m):\n            for c in range(p): C[r][c] += A[r][k] * B[k][c]\n    return C`
      },
      timeComplexity: "O(N * M * P) Time",
      timeExplanation: "Optimized L1 cache locality execution.",
      spaceComplexity: "O(N * P) Auxiliary Space",
      spaceExplanation: "Allocates output matrix."
    }
  },

  // 36. TRANSPOSE MATRIX
  36: {
    title: "Transpose Matrix",
    topic: "2D Arrays",
    difficulty: "Easy",
    problemStatement: "Given a 2D integer array matrix, return the transpose of matrix.\n\n📊 DIAGRAM:\nOriginal:       Transposed:\n[1, 2, 3]  -->  [1, 4]\n[4, 5, 6]       [2, 5]\n                [3, 6]\n\nThe transpose of a matrix is the matrix flipped over its main diagonal, switching the matrix's row and column indices.",
    examples: [ { input: "mat = [[1,2,3],[4,5,6]]", output: "[[1,4],[2,5],[3,6]]", explanation: "Rows become columns and columns become rows." } ],
    brute: {
      title: "Optimal Approach: Create new C x R matrix O(R*C)",
      algorithm: { english: "1. Create a new matrix of size C x R.\n2. Iterate through original matrix, assigning newMat[c][r] = mat[r][c].", hinglish: "1. Naya matrix banao C x R size ka.\n2. Original matrix loop karke naye matrix me col, row index swap karke assign karo." },
      pseudocode: `FUNCTION transpose(mat):
  CREATE newMat[C][R]
  FOR r FROM 0 TO R-1:
    FOR c FROM 0 TO C-1:
      newMat[c][r] = mat[r][c]
  RETURN newMat`,
      dryRun: [ { step: "1", state: "mat=[[1,2],[3,4]]", action: "newMat[0][0]=1, newMat[1][0]=2, newMat[0][1]=3, newMat[1][1]=4" } ],
      code: {
        cpp: `#include <vector>\nusing namespace std;\nvector<vector<int>> transpose(vector<vector<int>>& mat) {\n    int R = mat.size(), C = mat[0].size();\n    vector<vector<int>> res(C, vector<int>(R));\n    for (int r = 0; r < R; r++) for (int c = 0; c < C; c++) res[c][r] = mat[r][c];\n    return res;\n}`,
        java: `public class Solution {\n    public int[][] transpose(int[][] mat) {\n        int R = mat.length, C = mat[0].length;\n        int[][] res = new int[C][R];\n        for (int r = 0; r < R; r++) for (int c = 0; c < C; c++) res[c][r] = mat[r][c];\n        return res;\n    }\n}`,
        python: `def transpose(mat):\n    return [[mat[r][c] for r in range(len(mat))] for c in range(len(mat[0]))]`
      },
      timeComplexity: "O(R * C)", timeExplanation: "Visit every element.", spaceComplexity: "O(R * C)", spaceExplanation: "New matrix space."
    },
    optimal: {
      title: "Same as Brute (Optimal for non-square matrices)",
      algorithm: { english: "Same as brute force.", hinglish: "Same as brute force." },
      pseudocode: "Same as above",
      dryRun: [],
      code: { cpp: "", java: "", python: "" },
      timeComplexity: "O(R * C)", timeExplanation: "Visit every element.", spaceComplexity: "O(R * C)", spaceExplanation: "New matrix space."
    }
  },

  // 37. SPIRAL MATRIX
  37: {
    title: "Spiral Matrix",
    topic: "2D Arrays",
    difficulty: "Medium",
    problemStatement: "Given an m x n matrix, return all elements of the matrix in spiral order.\n\n📊 DIAGRAM:\n[1 -> 2 -> 3]\n           |\n[4 -> 5    6]\n |         |\n[7 <- 8 <- 9]\n\nOrder: 1, 2, 3, 6, 9, 8, 7, 4, 5",
    examples: [ { input: "matrix = [[1,2,3],[4,5,6],[7,8,9]]", output: "[1,2,3,6,9,8,7,4,5]", explanation: "Traverse right, down, left, up repeatedly." } ],
    brute: {
      title: "Optimal Approach: 4 Boundary Pointers O(N*M)",
      algorithm: { english: "1. Track 4 boundaries: top, bottom, left, right.\n2. Traverse left->right, then top++, down, right--, right->left, bottom--, up, left++.\n3. Loop while top <= bottom and left <= right.", hinglish: "1. 4 boundaries rakho: top, bottom, left, right.\n2. Right jao, fir neeche, fir left, fir upar. Boundaries shrink karte raho.\n3. Loop tab tak jab tak boundaries cross na kare." },
      pseudocode: `FUNCTION spiralOrder(matrix):
  top=0, bottom=R-1, left=0, right=C-1
  WHILE top<=bottom AND left<=right:
    FOR i=left TO right: ADD matrix[top][i]; top++
    FOR i=top TO bottom: ADD matrix[i][right]; right--
    IF top<=bottom:
      FOR i=right DOWNTO left: ADD matrix[bottom][i]; bottom--
    IF left<=right:
      FOR i=bottom DOWNTO top: ADD matrix[i][left]; left++`,
      dryRun: [ { step: "1", state: "top=0, bot=2, L=0, R=2", action: "Right: 1,2,3. Down: 6,9. Left: 8,7. Up: 4. Right: 5." } ],
      code: {
        cpp: `#include <vector>\nusing namespace std;\nvector<int> spiralOrder(vector<vector<int>>& mat) {\n    vector<int> res; int top=0, bottom=mat.size()-1, left=0, right=mat[0].size()-1;\n    while(top<=bottom && left<=right) {\n        for(int i=left; i<=right; i++) res.push_back(mat[top][i]); top++;\n        for(int i=top; i<=bottom; i++) res.push_back(mat[i][right]); right--;\n        if(top<=bottom) { for(int i=right; i>=left; i--) res.push_back(mat[bottom][i]); bottom--; }\n        if(left<=right) { for(int i=bottom; i>=top; i--) res.push_back(mat[i][left]); left++; }\n    } return res;\n}`,
        java: `import java.util.*;\npublic class Solution {\n    public List<Integer> spiralOrder(int[][] mat) {\n        List<Integer> res = new ArrayList<>();\n        int top=0, bottom=mat.length-1, left=0, right=mat[0].length-1;\n        while(top<=bottom && left<=right) {\n            for(int i=left; i<=right; i++) res.add(mat[top][i]); top++;\n            for(int i=top; i<=bottom; i++) res.add(mat[i][right]); right--;\n            if(top<=bottom) { for(int i=right; i>=left; i--) res.add(mat[bottom][i]); bottom--; }\n            if(left<=right) { for(int i=bottom; i>=top; i--) res.add(mat[i][left]); left++; }\n        } return res;\n    }\n}`,
        python: `def spiralOrder(mat):\n    res = []\n    top, bot, L, R = 0, len(mat)-1, 0, len(mat[0])-1\n    while top<=bot and L<=R:\n        for i in range(L, R+1): res.append(mat[top][i])\n        top += 1\n        for i in range(top, bot+1): res.append(mat[i][R])\n        R -= 1\n        if top<=bot:\n            for i in range(R, L-1, -1): res.append(mat[bot][i])\n            bot -= 1\n        if L<=R:\n            for i in range(bot, top-1, -1): res.append(mat[i][L])\n            L += 1\n    return res`
      },
      timeComplexity: "O(N * M)", timeExplanation: "Visit every element exactly once.", spaceComplexity: "O(1)", spaceExplanation: "Result array not counted in auxiliary space."
    },
    optimal: {
      title: "Same as above", algorithm: { english: "-", hinglish: "-" }, pseudocode: "-", dryRun: [], code: { cpp: "", java: "", python: "" }, timeComplexity: "O(N*M)", timeExplanation: "-", spaceComplexity: "O(1)", spaceExplanation: "-"
    }
  },

  // 38. ZIGZAG MATRIX
  38: {
    title: "ZigZag Matrix",
    topic: "2D Arrays",
    difficulty: "Medium",
    problemStatement: "Print matrix in Zig-Zag pattern (also known as wave pattern).\n\n📊 DIAGRAM:\n[1 -> 2 -> 3]\n           |\n[4 <- 5 <- 6]\n |\n[7 -> 8 -> 9]\n\nOutput: 1 2 3 6 5 4 7 8 9",
    examples: [ { input: "mat = [[1,2,3],[4,5,6],[7,8,9]]", output: "[1,2,3,6,5,4,7,8,9]", explanation: "Even rows go left-to-right, odd rows go right-to-left." } ],
    brute: {
      title: "Optimal Approach: Even/Odd Row Checking O(N*M)",
      algorithm: { english: "1. Iterate over rows from 0 to R-1.\n2. If row is even, print left to right.\n3. If row is odd, print right to left.", hinglish: "1. Rows ko 0 se R-1 tak loop karo.\n2. Agar row even hai toh seedha print karo, odd hai toh ulta print karo." },
      pseudocode: `FUNCTION zigZag(mat):
  FOR r FROM 0 TO R-1:
    IF r % 2 == 0:
      FOR c FROM 0 TO C-1: print mat[r][c]
    ELSE:
      FOR c FROM C-1 DOWNTO 0: print mat[r][c]`,
      dryRun: [ { step: "1", state: "r=0 (Even)", action: "Print 1, 2, 3" }, { step: "2", state: "r=1 (Odd)", action: "Print 6, 5, 4" } ],
      code: {
        cpp: `#include <vector>\nusing namespace std;\nvector<int> wavePrint(vector<vector<int>> mat) {\n    vector<int> res; int R = mat.size(), C = mat[0].size();\n    for (int r = 0; r < R; r++) {\n        if (r % 2 == 0) for (int c = 0; c < C; c++) res.push_back(mat[r][c]);\n        else for (int c = C - 1; c >= 0; c--) res.push_back(mat[r][c]);\n    }\n    return res;\n}`,
        java: `import java.util.*;\npublic class Solution {\n    public List<Integer> wavePrint(int[][] mat) {\n        List<Integer> res = new ArrayList<>();\n        int R = mat.length, C = mat[0].length;\n        for (int r = 0; r < R; r++) {\n            if (r % 2 == 0) for (int c = 0; c < C; c++) res.add(mat[r][c]);\n            else for (int c = C - 1; c >= 0; c--) res.add(mat[r][c]);\n        }\n        return res;\n    }\n}`,
        python: `def wavePrint(mat):\n    res = []\n    for r in range(len(mat)):\n        if r % 2 == 0: res.extend(mat[r])\n        else: res.extend(reversed(mat[r]))\n    return res`
      },
      timeComplexity: "O(R * C)", timeExplanation: "Visit every element.", spaceComplexity: "O(1)", spaceExplanation: "No extra space."
    },
    optimal: {
      title: "Same as above", algorithm: { english: "-", hinglish: "-" }, pseudocode: "-", dryRun: [], code: { cpp: "", java: "", python: "" }, timeComplexity: "O(R*C)", timeExplanation: "-", spaceComplexity: "O(1)", spaceExplanation: "-"
    }
  },

  // 39. ROTATE MATRIX 90 DEGREES
  39: {
    title: "Rotate Matrix (90°)",
    topic: "2D Arrays",
    difficulty: "Medium",
    problemStatement: "You are given an n x n 2D matrix representing an image, rotate the image by 90 degrees (clockwise).\n\n📊 DIAGRAM:\n[1 2 3]      [7 4 1]\n[4 5 6]  ->  [8 5 2]\n[7 8 9]      [9 6 3]\n\nNotice how the first row becomes the last column!",
    examples: [ { input: "mat = [[1,2,3],[4,5,6],[7,8,9]]", output: "[[7,4,1],[8,5,2],[9,6,3]]", explanation: "Matrix rotated clockwise by 90 degrees in-place." } ],
    brute: {
      title: "Optimal Approach: Transpose + Reverse Rows O(N²)",
      algorithm: { english: "1. Find the Transpose of the matrix (swap mat[i][j] with mat[j][i]).\n2. Reverse each row of the transposed matrix.", hinglish: "1. Matrix ka transpose nikalo (rows aur columns swap karo).\n2. Phir har row ko reverse kar do (ulta kardo)." },
      pseudocode: `FUNCTION rotate90(mat):
  // Transpose
  FOR i FROM 0 TO N-1:
    FOR j FROM i TO N-1:
      SWAP(mat[i][j], mat[j][i])
  // Reverse Rows
  FOR i FROM 0 TO N-1:
    REVERSE(mat[i])`,
      dryRun: [ { step: "1", state: "Transpose", action: "[1,4,7], [2,5,8], [3,6,9]" }, { step: "2", state: "Reverse Rows", action: "[7,4,1], [8,5,2], [9,6,3]!" } ],
      code: {
        cpp: `#include <vector>\n#include <algorithm>\nusing namespace std;\nvoid rotate(vector<vector<int>>& mat) {\n    int n = mat.size();\n    for(int i=0; i<n; i++) for(int j=i; j<n; j++) swap(mat[i][j], mat[j][i]);\n    for(int i=0; i<n; i++) reverse(mat[i].begin(), mat[i].end());\n}`,
        java: `public class Solution {\n    public void rotate(int[][] mat) {\n        int n = mat.length;\n        for(int i=0; i<n; i++) {\n            for(int j=i; j<n; j++) { int temp=mat[i][j]; mat[i][j]=mat[j][i]; mat[j][i]=temp; }\n        }\n        for(int i=0; i<n; i++) {\n            int L=0, R=n-1;\n            while(L<R) { int temp=mat[i][L]; mat[i][L]=mat[i][R]; mat[i][R]=temp; L++; R--; }\n        }\n    }\n}`,
        python: `def rotate(mat):\n    n = len(mat)\n    for i in range(n):\n        for j in range(i, n):\n            mat[i][j], mat[j][i] = mat[j][i], mat[i][j]\n    for i in range(n): mat[i].reverse()`
      },
      timeComplexity: "O(N²)", timeExplanation: "Transpose takes O(N²), Reverse takes O(N²).", spaceComplexity: "O(1)", spaceExplanation: "In-place rotation."
    },
    optimal: {
      title: "Same as above", algorithm: { english: "-", hinglish: "-" }, pseudocode: "-", dryRun: [], code: { cpp: "", java: "", python: "" }, timeComplexity: "O(N²)", timeExplanation: "-", spaceComplexity: "O(1)", spaceExplanation: "-"
    }
  },

  // 40. DETERMINE MATRIX ROTATION
  40: {
    title: "Determine Whether Matrix Can Be Obtained By Rotation",
    topic: "2D Arrays",
    difficulty: "Easy",
    problemStatement: "Given two n x n binary matrices mat and target, return true if it is possible to make mat equal to target by rotating mat in 90-degree increments, or false otherwise.\n\n📊 DIAGRAM:\nmat:       target:\n[0,1]      [1,0]\n[1,0]      [0,1]\n\nRotate 90deg once -> [1,0]\n                     [0,1] == target!",
    examples: [ { input: "mat = [[0,1],[1,0]], target = [[1,0],[0,1]]", output: "true", explanation: "We can rotate mat 90 degrees clockwise to make it equal to target." } ],
    brute: {
      title: "Optimal Approach: Rotate 4 Times and Check O(N²)",
      algorithm: { english: "1. Loop 4 times (for 90, 180, 270, 360 degrees).\n2. If mat == target, return true.\n3. Else, rotate mat by 90 degrees.\n4. If loop finishes, return false.", hinglish: "1. 4 baar loop chalao.\n2. Agar matrix aur target same hain, return true.\n3. Warna matrix ko 90 degree rotate kar do.\n4. 4 rotation ke baad bhi na mile toh false." },
      pseudocode: `FUNCTION findRotation(mat, target):
  FOR step FROM 1 TO 4:
    IF mat == target RETURN TRUE
    mat = ROTATE_90(mat)
  RETURN FALSE`,
      dryRun: [ { step: "1", state: "mat vs target", action: "Check if equal. If not, rotate 90 degrees and check again." } ],
      code: {
        cpp: `#include <vector>\n#include <algorithm>\nusing namespace std;\nbool findRotation(vector<vector<int>>& mat, vector<vector<int>>& target) {\n    for(int step=0; step<4; step++) {\n        if(mat == target) return true;\n        int n = mat.size();\n        for(int i=0; i<n; i++) for(int j=i; j<n; j++) swap(mat[i][j], mat[j][i]);\n        for(int i=0; i<n; i++) reverse(mat[i].begin(), mat[i].end());\n    }\n    return false;\n}`,
        java: `import java.util.*;\npublic class Solution {\n    public boolean findRotation(int[][] mat, int[][] target) {\n        for(int step=0; step<4; step++) {\n            if(Arrays.deepEquals(mat, target)) return true;\n            int n = mat.length;\n            for(int i=0; i<n; i++) for(int j=i; j<n; j++) { int t=mat[i][j]; mat[i][j]=mat[j][i]; mat[j][i]=t; }\n            for(int i=0; i<n; i++) { int L=0, R=n-1; while(L<R){ int t=mat[i][L]; mat[i][L]=mat[i][R]; mat[i][R]=t; L++; R--; } }\n        }\n        return false;\n    }\n}`,
        python: `def findRotation(mat, target):\n    for _ in range(4):\n        if mat == target: return True\n        mat = [list(x) for x in zip(*mat[::-1])]\n    return False`
      },
      timeComplexity: "O(N²)", timeExplanation: "Check and rotate take O(N²), done 4 times.", spaceComplexity: "O(1)", spaceExplanation: "In-place rotations."
    },
    optimal: {
      title: "Same as above", algorithm: { english: "-", hinglish: "-" }, pseudocode: "-", dryRun: [], code: { cpp: "", java: "", python: "" }, timeComplexity: "O(N²)", timeExplanation: "-", spaceComplexity: "O(1)", spaceExplanation: "-"
    }
  },

  // 41. SET MATRIX ZEROES
  41: {
    title: "Set Matrix Zeroes",
    topic: "2D Arrays",
    difficulty: "Medium",
    problemStatement: "Given an m x n integer matrix, if an element is 0, set its entire row and column to 0's.\n\n📊 DIAGRAM:\nOriginal:      Result:\n[1 1 1]        [1 0 1]\n[1 0 1]   ->   [0 0 0]\n[1 1 1]        [1 0 1]\n\nThe 0 at (1,1) caused row 1 and col 1 to become all zeroes.",
    examples: [ { input: "matrix = [[1,1,1],[1,0,1],[1,1,1]]", output: "[[1,0,1],[0,0,0],[1,0,1]]", explanation: "Element at (1,1) is 0, so row 1 and col 1 are set to 0." } ],
    brute: {
      title: "Better Approach: O(M+N) Extra Space",
      algorithm: { english: "1. Create two arrays: rowArray[R] and colArray[C].\n2. If mat[r][c] == 0, mark rowArray[r] = 1 and colArray[c] = 1.\n3. Second pass: If rowArray[r]==1 or colArray[c]==1, set mat[r][c] = 0.", hinglish: "1. Do array banao: row track karne ko aur col track karne ko.\n2. Jab bhi 0 mile, uski row aur col ko mark kar do arrays me.\n3. Wapis loop karke jaha marker 1 ho, usko 0 kar do." },
      pseudocode: `FUNCTION setZeroesBetter(mat):
  CREATE rowArr[R], colArr[C]
  FOR r=0 TO R-1:
    FOR c=0 TO C-1:
      IF mat[r][c] == 0: rowArr[r]=1, colArr[c]=1
  FOR r=0 TO R-1:
    FOR c=0 TO C-1:
      IF rowArr[r]==1 OR colArr[c]==1: mat[r][c] = 0`,
      dryRun: [ { step: "1", state: "mat[1][1] = 0", action: "rowArr[1]=1, colArr[1]=1. Set all cells in row 1 and col 1 to 0." } ],
      code: {
        cpp: `#include <vector>\nusing namespace std;\nvoid setZeroes(vector<vector<int>>& mat) {\n    int R=mat.size(), C=mat[0].size();\n    vector<int> row(R,0), col(C,0);\n    for(int r=0; r<R; r++) for(int c=0; c<C; c++) if(mat[r][c]==0) { row[r]=1; col[c]=1; }\n    for(int r=0; r<R; r++) for(int c=0; c<C; c++) if(row[r] || col[c]) mat[r][c]=0;\n}`,
        java: `public class Solution {\n    public void setZeroes(int[][] mat) {\n        int R=mat.length, C=mat[0].length;\n        int[] row = new int[R]; int[] col = new int[C];\n        for(int r=0; r<R; r++) for(int c=0; c<C; c++) if(mat[r][c]==0) { row[r]=1; col[c]=1; }\n        for(int r=0; r<R; r++) for(int c=0; c<C; c++) if(row[r]==1 || col[c]==1) mat[r][c]=0;\n    }\n}`,
        python: `def setZeroes(mat):\n    R, C = len(mat), len(mat[0])\n    row, col = [0]*R, [0]*C\n    for r in range(R):\n        for c in range(C):\n            if mat[r][c] == 0: row[r] = 1; col[c] = 1\n    for r in range(R):\n        for c in range(C):\n            if row[r] or col[c]: mat[r][c] = 0`
      },
      timeComplexity: "O(R * C)", timeExplanation: "Two matrix passes.", spaceComplexity: "O(R + C)", spaceExplanation: "Row and col tracking arrays."
    },
    optimal: {
      title: "Optimal Approach: In-Place Markers O(1) Space",
      algorithm: { english: "1. Use first row and first col of matrix as the tracking arrays.\n2. Use a separate variable col0 for tracking the 0th column.\n3. Iterate backwards to overwrite with zeroes.", hinglish: "1. Matrix ki pehli row aur pehle col ko hi marking ke liye use karo.\n2. Ek extra variable col0 use karo first col ke overlap ko handle karne ke liye.\n3. End se matrix overwrite karo." },
      pseudocode: `FUNCTION setZeroesOptimal(mat):
  col0 = 1
  FOR r=0 TO R-1:
    IF mat[r][0] == 0: col0 = 0
    FOR c=1 TO C-1:
      IF mat[r][c] == 0: mat[r][0]=0, mat[0][c]=0
  FOR r=R-1 DOWNTO 0:
    FOR c=C-1 DOWNTO 1:
      IF mat[r][0]==0 OR mat[0][c]==0: mat[r][c]=0
    IF col0 == 0: mat[r][0]=0`,
      dryRun: [ { step: "1", state: "mat[1][1] = 0", action: "mat[1][0] = 0, mat[0][1] = 0. Later, cells overwritten with 0." } ],
      code: {
        cpp: `#include <vector>\nusing namespace std;\nvoid setZeroes(vector<vector<int>>& mat) {\n    int col0 = 1, R = mat.size(), C = mat[0].size();\n    for(int r=0; r<R; r++) { if(mat[r][0]==0) col0=0; for(int c=1; c<C; c++) if(mat[r][c]==0) mat[r][0] = mat[0][c] = 0; }\n    for(int r=R-1; r>=0; r--) { for(int c=C-1; c>=1; c--) if(mat[r][0]==0 || mat[0][c]==0) mat[r][c]=0; if(col0==0) mat[r][0]=0; }\n}`,
        java: `public class Solution {\n    public void setZeroes(int[][] mat) {\n        int col0 = 1, R = mat.length, C = mat[0].length;\n        for(int r=0; r<R; r++) { if(mat[r][0]==0) col0=0; for(int c=1; c<C; c++) if(mat[r][c]==0) { mat[r][0]=0; mat[0][c]=0; } }\n        for(int r=R-1; r>=0; r--) { for(int c=C-1; c>=1; c--) if(mat[r][0]==0 || mat[0][c]==0) mat[r][c]=0; if(col0==0) mat[r][0]=0; }\n    }\n}`,
        python: `def setZeroes(mat):\n    col0, R, C = 1, len(mat), len(mat[0])\n    for r in range(R):\n        if mat[r][0] == 0: col0 = 0\n        for c in range(1, C):\n            if mat[r][c] == 0: mat[r][0] = mat[0][c] = 0\n    for r in range(R-1, -1, -1):\n        for c in range(C-1, 0, -1):\n            if mat[r][0] == 0 or mat[0][c] == 0: mat[r][c] = 0\n        if col0 == 0: mat[r][0] = 0`
      },
      timeComplexity: "O(R * C)", timeExplanation: "Two matrix passes.", spaceComplexity: "O(1)", spaceExplanation: "In-place state marking."
    }
  }
}
