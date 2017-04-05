from database_layer.models import *


class HandleDatabase:

    def __init__(self):
        self.db = Database().db
        self.db.connect()

    def board_fill_row(self, board_id, title_id, title):
        Boards.create(board_id=board_id,
                      title_id=title_id,
                      title=title)

    def make_json_list_from_boards(self):
        all_boards = Boards.select()
        list_of_dicts = []
        for board in all_boards:
            list_of_dicts.append({'board_id': board.board_id,
                                  'title_id': board.title_id,
                                  'title': board.title,
                                  'cards': []})
        return list_of_dicts

    def delete_board(self, id_for_delete):
        board_for_delete = Boards.get(board_id=id_for_delete)
        board_for_delete.delete_instance(recursive=True)

    def edit_board(self, id_for_edit, title):
        edit = Boards.update(title=title).where(Boards.board_id == id_for_edit)
        edit.execute()

    def card_fill_row(self, card_id, title, parent_board, status, order):
        Cards.create(card_id=card_id,
                     title=title,
                     parent_board="board" + parent_board,
                     status=status,
                     order=order)

    def make_json_list_from_cards(self, parent_board_id):
        cards = Cards.select()
        list_of_dicts = []
        for card in cards:
            list_of_dicts.append({'card_id': card.card_id,
                                  'title': card.title,
                                  'parent_board': card.parent_board,
                                  'status': card.status,
                                  'order': card.order})
