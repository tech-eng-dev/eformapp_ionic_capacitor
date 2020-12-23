import { Injectable } from '@angular/core';
import { Observable, forkJoin } from 'rxjs';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';

@Injectable({
  providedIn: 'root'
})
export class DbService {
  public db: SQLiteObject;

  constructor(
    private sqlite: SQLite
  ) { 

  }

  creatTbls() {
    let result = new Observable(observer => {
      this.sqlite.create({
        name: 'eform.db', 
        location: 'default'
      })
        .then((db: SQLiteObject) => {
          console.log('eform.db is created!');
          this.db = db;
          let tblCreateRes_1 = this.createFoldersTbl();
          let tblCreateRes_2 = this.createEformsTbl();
          let tblCreateRes_3 = this.createEformDatesTbl();
          let tblCreateRes_4 = this.createCheckListsTbl();
          let tblCreateRes_5 = this.createFieldsTbl();
          let tblCreateRes_6 = this.createFieldOptionsTbl();
          let tblCreateRes_7 = this.createChecksTbl();
          let tblCreateRes_8 = this.createCheckListValuesTbl();
          let tblCreateRes_9 = this.createFieldValuesTbl();
          let tblCreateResArr = [tblCreateRes_1, tblCreateRes_2, tblCreateRes_3, tblCreateRes_4, tblCreateRes_5, tblCreateRes_6, tblCreateRes_7, tblCreateRes_8, tblCreateRes_9];

          forkJoin(tblCreateResArr)
            .subscribe(
              (results: any) => {
                console.log('tblCreateResArr results: ', results);
              },
              (error) => { console.error('tables create error!: ', error); },
              () => {
                console.log('Tables created');
              }
          );
          observer.next(this.db);
        })
        .catch((e: any) => { console.log(e); });
    });
    return result;
  }

  createFoldersTbl() {
    let sql = 'CREATE TABLE IF NOT EXISTS FOLDERS (' +
      'id integer primary key autoincrement, ' +
      'origin_id integer not null unique on conflict replace, ' +
      'name text not null, ' +
      'display_order integer not null);';
    return this.db.executeSql(sql, []);
  }

  createEformsTbl() {
    let sql = 'CREATE TABLE IF NOT EXISTS EFORMS (' +
      'id integer primary key autoincrement, ' +
      'origin_id integer not null unique on conflict ignore, ' +
      'name text not null, ' +
      'folder_name text, ' +
      'description text,' +
      'checks_limit integer not null, ' +
      'start_date text, ' +
      'due_date text, ' +
      'status text not null DEFAULT \'red\', ' +
      'time_period_validation text, ' +
      'folder_id integer not null, ' +
      'display_order integer not null, ' +
      'multi_approval integer not null, ' +
      'fast_navigation_enabled integer not null, ' +
      'summary_enabled integer not null, ' +
      'pink_bar_text text);';
    return this.db.executeSql(sql, []);
  }

  createEformDatesTbl() {
    let sql = 'CREATE TABLE IF NOT EXISTS EFORM_DATES (' +
      'id integer primary key autoincrement, ' +
      'schedule_id integer not null, ' +
      'date text not null);';
    return this.db.executeSql(sql, []);
  }

  createCheckListsTbl() {
    let sql = 'CREATE TABLE IF NOT EXISTS CHECK_LISTS (' +
      'id integer primary key autoincrement, ' +
      'origin_id integer not null unique, ' +
      'schedule_id integer not null, ' +
      'parent_id integer not null, ' +
      'status text not null DEFAULT \'red\', ' +
      'has_sub_check_lists integer not null, ' +
      'name text not null, ' +
      'display_order integer not null, ' +
      'review_button_enabled integer not null, ' +
      'fast_navigation_enabled integer not null, ' +
      'multi_approval_enabled integer not null, ' +
      'extra_fields_enabled integer not null, ' +
      'description text, ' +
      'pink_bar_text text, ' +
      'done_button_enabled integer not null, ' +
      'approval_enabled integer not null);';
    return this.db.executeSql(sql, []);
  }

  createFieldsTbl() {
    let sql = 'CREATE TABLE IF NOT EXISTS FIELDS (' +
      'id integer primary key autoincrement, ' +
      'origin_id integer not null unique, ' +
      'check_list_id integer not null, ' +
      'display_order integer, ' +
      'name text, ' +
      'description text, ' +
      'default_value text, ' +
      'type text not null, ' +
      'mandatory integer not null, ' +
      'color integer not null,' +
      'checkbox_selected integer, ' +
      'read_only integer not null, ' +
      'measure_unit text, ' +
      'decimal_count text, ' +
      'max_length integer, ' +
      'min_value text, ' +
      'max_value text, ' +
      'geolocation_enabled integer not null, ' +
      'max_precision real, ' +
      'multi integer DEFAULT 1, ' +
      'split_screen integer, ' +
      'source text, ' +
      'stop_on_save integer, ' +
      'downloaded integer DEFAULT 0);';
    return this.db.executeSql(sql, []);
  }

  createFieldOptionsTbl() {
    let sql = 'CREATE TABLE IF NOT EXISTS FIELD_OPTIONS (' +
      'id integer primary key autoincrement, ' +
      'field_id integer not null, ' +
      'key text not null, ' +
      'name text, ' +
      'option_selected integer);';
    return this.db.executeSql(sql, []);
  }

  createChecksTbl() {
    let sql = 'CREATE TABLE IF NOT EXISTS CHECKS (' +
      'id integer primary key autoincrement, ' +
      'schedule_id integer not null, ' +
      'date text not null, ' +
      'status text not null, ' +
      'validated_on_server integer DEFAULT 0, ' +
      'worker_id integer);';
    return this.db.executeSql(sql, []);
  }

  createCheckListValuesTbl() {
    let sql = 'CREATE TABLE IF NOT EXISTS CHECK_LIST_VALUES (' +
      'id integer primary key autoincrement, ' +
      'check_id integer not null, ' +
      'check_list_id integer not null, ' +
      'value text not null);';
    return this.db.executeSql(sql, []);
  }

  createFieldValuesTbl() {
    let sql = 'CREATE TABLE IF NOT EXISTS FIELD_VALUES (' +
      'id integer primary key autoincrement, ' +
      'check_list_value_id integer not null, ' +
      'field_id integer not null, ' +
      'row_type text not null, ' +
      'start_time text, ' +
      'time_passed text, ' +
      'stop_time text, ' +
      'new_start_time text, '+
      'row_value text not null, ' +
      'accuracy real, ' +
      'bearing real, ' +
      'altitude real, ' +
      'latitude real, ' +
      'longitude real, ' +
      'row_date text, ' +
      'hash text, ' +
      'uploaded integer, ' +
      'check_id integer);';
    return this.db.executeSql(sql, []);
  }
}
