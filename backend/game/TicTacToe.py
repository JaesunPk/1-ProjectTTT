class TicTacToe:
    def __init__(self):
        self.board = [' '] * 9
        self.current_player = 'X'

    def available_actions(self):
        return [i for i, v in enumerate(self.board) if v == ' ']
    
    def take_action(self, action):
        self.board[action] = self.current_player

        if self.check_win():
            return 1 if self.current_player == 'X' else -1
        elif ' ' not in self.board:
            return 0
        else:
            self.current_player = 'O' if self.current_player == 'X' else 'X'
            return None
        
    def check_win(self):
        combinations = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], # rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], # columns
            [0, 4, 8], [2, 4, 6]             # diagonals
        ]

        for combo in combinations:
            if self.board[combo[0]] == self.board[combo[1]] == self.board[combo[2]] != ' ':
                return True
        
        return False

    def reset(self):
        self.board = [' '] * 9
        self.current_player = 'X'